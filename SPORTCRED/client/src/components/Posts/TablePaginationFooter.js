import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import TableFooter from '@material-ui/core/TableFooter';


class TablePaginationFooter extends React.Component {

  handleChangePage(event, newPage) {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  render() {
    const { data, rowsPerPage, page, comp } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'Posts per page' },
              native: true,
            }}
            onChangePage={this.handleChangePage.bind(comp)}
            onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(comp)}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default TablePaginationFooter;
