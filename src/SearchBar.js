import React from 'react';

class SearchBar extends React.Component {
  state = { term: ''};

  onValueChange = (event) => {
    event.preventDefault();
    this.setState({ term: event.target.value});
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
        <div className="ui input">
        <input style={{border:'0px'}} type="text" placeholder={"Search By "+this.props.value} value={this.state.term} onChange={this.onValueChange} />
        </div>
    );
  }
}

export default SearchBar;
