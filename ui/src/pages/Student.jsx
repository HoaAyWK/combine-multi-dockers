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

import LetterAvatar from "../components/LetterAvatar";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  createStudent,
  deleteStudent,
  getStudents,
  refresh,
  selectAllStudents,
  updateStudent,
} from "../app/slices/studentSlice";
import { action_status, BASE_S3_URL } from "../app/constants";
import {
  SimpleTableListHead,
  SimpleTableListToolbar,
  MoreMenu,
} from "../components/tables";
import { fDate, fDateTimeSuffix } from "../utils/formatTime";
import { clearMessage } from "../app/slices/messageSlice";
import MoreMenuItem from "../components/tables/MoreMenuItem";
import AlertDialog from "../components/AlertDialog";
import StudentFormDialog from "../features/student/StudentFormDialog";

const ButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
  color: "#fff",
}));

const TABLE_HEAD = [
  { id: "name", label: "Full Name", alignRight: false },
  { id: "email", label: "email", alignRight: false },
  { id: "dateOfBirth", label: "Birth day", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
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

const Student = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [openCreateFormDialog, setOpenCreateFormDialog] = useState(false);

  const [openUpdateFormDialog, setOpenUpdateFormDialog] = useState(false);

  const dispatch = useDispatch();

  const students = useSelector(selectAllStudents);

  const { isAdded, isDeleted, isUpdated } = useSelector(
    (state) => state.students
  );

  const { message } = useSelector((state) => state.message);

  const { enqueueSnackbar } = useSnackbar();

  const { status } = useSelector((state) => state.students);

  useEffect(() => {
    if (isAdded) {
      enqueueSnackbar("Created successfully", { variant: "success" });
      dispatch(refresh());
    }
  }, [isAdded, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (status === action_status.IDLE) {
      dispatch(getStudents());
    }
    dispatch(clearMessage());
    dispatch(refresh());
  }, [dispatch, status]);

  useEffect(() => {
    if (isUpdated) {
      enqueueSnackbar("Updated successfully", { variant: "success" });
      dispatch(getStudents());
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
    dispatch(deleteStudent(id));
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
      <Page title="Student">
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
      <Page title="Student">
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

    const filteredStudents = applySortFilter(
      students,
      getComparator(order, orderBy),
      filterName
    );

    const isStudentNotFound = filteredStudents.length === 0;

    return (
      <Page title="Student">
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Student</Typography>
            <ButtonStyle
              variant="contained"
              onClick={handleClickOpenCreateFormDialog}
              startIcon={
                <Iconify icon="eva:plus-fill" style={{ color: "white" }} />
              }
            >
              New Student
            </ButtonStyle>
          </Stack>
          <StudentFormDialog
            open={openCreateFormDialog}
            handleClose={handleClickCloseCreateFormDialog}
            dialogTitle="Create Student"
            dialogContent="Create a new Student"
            studentAction={createStudent}
          />
          <Card>
            <SimpleTableListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
              title="Student"
            />
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SimpleTableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={students.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredStudents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        email,
                        dateOfBirth,
                        gender,
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
                                <Avatar
                                  src={`${BASE_S3_URL}${avatar}`}
                                  alt={`${firstName}`}
                                />
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
                          <TableCell align="left">
                            {fDate(dateOfBirth)}
                          </TableCell>
                          <TableCell align="left">{gender}</TableCell>
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
                                title="Delete Student"
                                content="Are you sure to delete this student"
                                handleConfirm={handleDelete}
                                color="error"
                              />
                              <StudentFormDialog
                                open={openUpdateFormDialog}
                                handleClose={handleClickCloseUpdateFormDialog}
                                dialogTitle="Edit Student"
                                dialogContent="Update student"
                                student={row}
                                studentAction={updateStudent}
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

                {isStudentNotFound && (
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
              count={students.length}
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

export default Student;
