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
  createEnrollment,
  deleteEnrollment,
  refresh,
  selectAllEnrollments,
  getEnrollments,
} from "../app/slices/enrollmentSlice";
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
import EnrollmentFormDialog from "../features/enrollment/EnrollmentFormDialog";
import Subject from "./subject";

const ButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
  color: "#fff",
}));

const TABLE_HEAD = [
  { id: "student", label: "Student", alignRight: false },
  { id: "course", label: "Course", alignRight: false },
  { id: "instructor", label: "Instructor", alignRight: false },
  { id: "semester", label: "Semester", alignRight: false },
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

const Enrollment = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [openCreateFormDialog, setOpenCreateFormDialog] = useState(false);

  const dispatch = useDispatch();

  const enrollments = useSelector(selectAllEnrollments);

  const { isAdded, isDeleted, isUpdated } = useSelector(
    (state) => state.enrollments
  );

  const { message } = useSelector((state) => state.message);

  const { enqueueSnackbar } = useSnackbar();

  const { status } = useSelector((state) => state.enrollments);

  useEffect(() => {
    if (isAdded) {
      enqueueSnackbar("Created successfully", { variant: "success" });
      dispatch(getEnrollments());
      dispatch(refresh());
    }
  }, [isAdded, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (status === action_status.IDLE) {
      dispatch(getEnrollments());
    }
    dispatch(clearMessage());
    dispatch(refresh());
  }, [dispatch, status]);

  useEffect(() => {
    if (isUpdated) {
      enqueueSnackbar("Updated successfully", { variant: "success" });
      dispatch(getEnrollments());
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

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteEnrollment(id));
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
      <Page title="Enrollment">
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
      <Page title="Enrollment">
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - enrollments.length) : 0;

    const filteredEnrollments = applySortFilter(
      enrollments,
      getComparator(order, orderBy),
      filterName
    );

    const isCourseNotFound = filteredEnrollments.length === 0;

    console.log("Enrollments", enrollments);

    return (
      <Page title="Enrollment">
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Enrollment</Typography>
            <ButtonStyle
              variant="contained"
              onClick={handleClickOpenCreateFormDialog}
              startIcon={
                <Iconify icon="eva:plus-fill" style={{ color: "white" }} />
              }
            >
              New Enrollment
            </ButtonStyle>
          </Stack>
          <EnrollmentFormDialog
            open={openCreateFormDialog}
            handleClose={handleClickCloseCreateFormDialog}
            dialogTitle="Create Enrollment"
            dialogContent="Create a new Enrollment"
            enrollmentAction={createEnrollment}
          />
          <Card>
            <SimpleTableListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
              title="Enrollment"
            />
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SimpleTableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={enrollments.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredEnrollments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, course, student } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left" width={300}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {student?.avatar ? (
                                <Avatar
                                  src={`${BASE_S3_URL}${student?.avatar}`}
                                  alt={`${student?.firstName}`}
                                />
                              ) : (
                                <LetterAvatar name={`${student?.firstName}`} />
                              )}
                              <Typography
                                variant="body1"
                                sx={{
                                  marginInlineStart: 1,
                                }}
                              >
                                {`${student?.firstName} ${student?.lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            {`Course ${course?.id} - ${course?.subject?.name}`}
                          </TableCell>

                          <TableCell align="left" width={300}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {course?.instructor?.avatar ? (
                                <Avatar
                                  src={`${BASE_S3_URL}${course?.instructor?.avatar}`}
                                  alt={`${course?.instructor?.firstName}`}
                                />
                              ) : (
                                <LetterAvatar
                                  name={`${course?.instructor?.firstName}`}
                                />
                              )}
                              <Typography
                                variant="body1"
                                sx={{
                                  marginInlineStart: 1,
                                }}
                              >
                                {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            {course?.semester?.name}
                          </TableCell>
                          <TableCell align="right">
                            <MoreMenu>
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
                                title="Delete Course"
                                content="Are you sure to delete this course"
                                handleConfirm={handleDelete}
                                color="error"
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

                {isCourseNotFound && (
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
              count={enrollments.length}
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

export default Enrollment;
