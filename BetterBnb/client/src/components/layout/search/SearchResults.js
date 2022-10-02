import React, { Component } from "react";
import { connect } from "react-redux";
import { searchResultsAction } from "../../../store/actions/searchResultsAction";
import Loading from "../../layout/Loading";
import SearchArea from "./SearchArea";
import ApartmentsListsbyCountry from "../../layout/ApartmentsListsbyCountry";
import axios from "axios";
import queryString from "query-string";

class SearchResults extends Component {
  state = {};
  componentDidMount() {
    this.props.searchResultsAction(this.props.location.search);
  }

  render() {
    let searchQuery = queryString.parse(this.props.location.search);
    console.log(this.props);
    const searchedPosts = this.props.searched_posts;
    return (
      <div className="container">
        {/* Pass search results to list component */}
        {this.props.searchLoading ? (
          <Loading />
        ) : this.props.searched_posts.length < 0 ? (
          <React.Fragment>
            <div className="col s12">
              <h4 className="grey-text text-darken-1 center-align">
                Search results for apartments in {searchQuery.country}
              </h4>
              <h6 className="grey-text text-darken-1 center-align">
                <span>
                  that are available between {searchQuery.start_date} -{" "}
                  {searchQuery.end_date}
                </span>
                <span> for {searchQuery.guest_num} guest:</span>
              </h6>
            </div>
            <ApartmentsListsbyCountry posts={searchedPosts} />
          </React.Fragment>
        ) : (
          <div>
            <h4 className="grey-text text-darken-1 center-align">
              Could not find any apartments that suits your criteria Would you
              like to search something else?
            </h4>
            <SearchArea />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searched_posts: state.search_results.searched_posts,
    searchLoading: state.search_results.searchLoading
  };
};

const mapDispatchToProps = dispatch => ({
  searchResultsAction: data => dispatch(searchResultsAction(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
