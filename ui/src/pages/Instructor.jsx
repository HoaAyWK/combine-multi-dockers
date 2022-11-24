import React, { useState, useEffect } from "react";
import { filter } from "lodash";
import {
  Avatar,
  Box,
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  CircularProgress,
  Typography,
  TableContainer,
  TablePagination,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Label from '../components/Label';
import LetterAvatar from "../components/LetterAvatar";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  createInstructor,
  updateInstructor,
  deleteInstructor,
  getInstructors,
  refresh,
  selectAllInstructors,
} from "../app/slices/instructorSlice";
import { action_status, BASE_S3_URL } from "../app/constants";
import {
  SimpleTableListHead,
  SimpleTableListToolbar,
  MoreMenu,
} from "../components/tables";
import { fDate } from "../utils/formatTime";
import { clearMessage } from "../app/slices/messageSlice";
import MoreMenuItem from "../components/tables/MoreMenuItem";
import AlertDialog from "../components/AlertDialog";
import InstructorFormDialog from "../features/instructor/InstructorFormDialog";

const ButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
  color: "#fff",
}));

const TABLE_HEAD = [
  { id: "firstName", label: "Full Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Phone", alignRight: false },
  { id: "dateOfBirth", label: "Birth day", alignRight: false },
  { id: "dateJoin", label: "Date Join", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "", label: "", alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (item) =>
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase())
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Instructor = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [openCreateFormDialog, setOpenCreateFormDialog] = useState(false);

  const [openUpdateFormDialog, setOpenUpdateFormDialog] = useState(false);

  const dispatch = useDispatch();

  const instructors = useSelector(selectAllInstructors);

  const { isAdded, isDeleted, isUpdated } = useSelector(
    (state) => state.instructors
  );

  const { message } = useSelector((state) => state.message);

  const { enqueueSnackbar } = useSnackbar();

  const { status } = useSelector((state) => state.instructors);

  useEffect(() => {
    if (isAdded) {
      enqueueSnackbar("Created successfully", { variant: "success" });
      dispatch(refresh());
    }
  }, [isAdded, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (status === action_status.IDLE) {
      dispatch(getInstructors());
    }
    dispatch(clearMessage());
    dispatch(refresh());
  }, [dispatch, status]);

  useEffect(() => {
    if (isUpdated) {
      enqueueSnackbar("Updated successfully", { variant: "success" });
      dispatch(getInstructors());
      dispatch(refresh());
    }
  }, [isUpdated, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (isDeleted) {
      enqueueSnackbar("Deleted successfully", { variant: "success" });
      dispatch(refresh());
    }
  }, [isDeleted, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: "error" });
      dispatch(clearMessage());
    }
  }, [message, dispatch, enqueueSnackbar]);

  const handleClickOpenCreateFormDialog = () => {
    setOpenCreateFormDialog(true);
  };

  const handleClickCloseCreateFormDialog = () => {
    setOpenCreateFormDialog(false);
  };

  const handleClickOpenUpdateFormDialog = () => {
    setOpenUpdateFormDialog(true);
  };

  const handleClickCloseUpdateFormDialog = () => {
    setOpenUpdateFormDialog(false);
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteInstructor(id));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (status === action_status.LOADING) {
    return (
      <Page title="Instructor">
        <Container maxWidth="xl">
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </Page>
    );
  } else if (status === action_status.FAILED) {
    return (
      <Page title="Instructor">
        <Container maxWidth="xl">
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alert severity="error">Error when fecth data</Alert>
          </Box>
        </Container>
      </Page>
    );
  } else if (status === action_status.SUCCEEDED) {
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - instructors.length) : 0;

    const filteredInstructors = applySortFilter(
      instructors,
      getComparator(order, orderBy),
      filterName
    );

    const isInstructorNotFound = filteredInstructors.length === 0;

    return (
      <Page title="Instructor">
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Instructor</Typography>
            <ButtonStyle
              variant="contained"
              onClick={handleClickOpenCreateFormDialog}
              startIcon={
                <Iconify icon="eva:plus-fill" style={{ color: "white" }} />
              }
            >
              New Instructor
            </ButtonStyle>
          </Stack>
          <InstructorFormDialog
            open={openCreateFormDialog}
            handleClose={handleClickCloseCreateFormDialog}
            dialogTitle="Create Instructor"
            dialogContent="Create a new Instructor"
            instructorAction={createInstructor}
          />
          <Card>
            <SimpleTableListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
              title="Instructor"
            />
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SimpleTableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={instructors.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredInstructors
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        dateOfBirth,
                        dateJoin,
                        status,
                        avatar,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left" width={300}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {avatar ? (
                                <Avatar src={`${BASE_S3_URL}${avatar}`} alt={`${firstName}`} />
                              ) : (
                                <LetterAvatar name={`${firstName}`} />
                              )}
                              <Typography
                                variant="body1"
                                sx={{
                                  marginInlineStart: 1,
                                }}
                              >
                                {`${firstName} ${lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">
                            {fDate(dateOfBirth)}
                          </TableCell>
                          <TableCell align="left">{fDate(dateJoin)}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={status === 'Active' ? 'success' : 'error' }>
                              {status}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <MoreMenu>
                              <MoreMenuItem
                                title="Edit"
                                iconName="eva:edit-fill"
                                handleClick={handleClickOpenUpdateFormDialog}
                              />
                              <MoreMenuItem
                                title="Delete"
                                iconName="eva:trash-2-outline"
                                handleClick={handleDeleteClick}
                                id={id}
                              />
                              <AlertDialog
                                itemId={id}
                                open={open}
                                handleClose={handleClose}
                                title="Delete Instructor"
                                content="Are you sure to delete this instructor"
                                handleConfirm={handleDelete}
                                color="error"
                              />
                              <InstructorFormDialog
                                open={openUpdateFormDialog}
                                handleClose={handleClickCloseUpdateFormDialog}
                                dialogTitle="Edit Instructor"
                                dialogContent="Update Instructor"
                                instructor={row}
                                instructorAction={updateInstructor}
                              />
                            </MoreMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isInstructorNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={instructors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    );
  }
};

export default Instructor;
