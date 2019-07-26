import React from 'react';
import axios from 'axios'
import StudentList from './StudentList'
import SearchBar from './SearchBar';

class App extends React.Component {
  state = {students: [], data: [] };

  componentDidMount = async () => {

    const response = await axios.get("******************************");
    this.setState({ students:response.data.students, data:response.data.students});
  }

  filterByName = (term) => {
    let result=[];
    let t=term.toLowerCase();
    for (let p of this.state.data) {
      if (p.firstName.toLowerCase().includes(t) || p.lastName.toLowerCase().includes(t)) {
        result.push(p);
      }
    }

    this.setState({ students: result});
  }

  filterByTags = (term) => {
    let result=new Set();
    let t=term.toLowerCase();

    for (let p of this.state.data) {
      if (typeof p.tags !== "undefined") {
          for (let tag of p.tags) {
            if (tag.toLowerCase()===t) {result.add(p);}
          }
        }
      }
    let array=Array.from(result);
    this.setState({ students: array});
  }

  addTags = (id, tags) => {
    let info=this.state.data;
    for (let student of info) {
      if (student.id===id) {
        console.log(student);
        student.tags=tags;
      }
    }
    this.setState({data:info});
  }


  render() {
    return (
      <div style={{ margin: '10vh auto', width:'800px'}}>
        <div className="ui card" style={{ maxHeight: '80vh', width: '100%'}}>
          <br />
          <SearchBar onSearch={this.filterByName} value={"Name"}/>
          <div className="ui divider"></div>
          <SearchBar onSearch={this.filterByTags} value={"Tags"}/>
          <div className="ui divider"></div>
          <div style={{ overflow: 'auto', maxHeight: '100%', width: '100%'}}>
            <StudentList passTags={this.addTags} students={this.state.students}/>
          </div>
        </div>
      </div>
    );
  }
};
export default App;
