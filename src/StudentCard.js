import React from 'react';

class StudentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={ avg:0, term: '', tags:[] };
  }

  componentDidMount() {
    this.calculateAvg();
   }

  calculateAvg = () => {
    let avg;
    let s=0;
    for (let grade of this.props.grades) {
      s=s+parseInt(grade);
    };
    avg=s/this.props.grades.length;
    this.setState({ avg:avg })
  };

  expand = (event) => {
    let ele=event.target;
    let header=ele.parentNode.parentNode;
    let hidden=header.nextSibling.nextSibling
    if(hidden.style.display === 'none') {
      hidden.style.display = 'block';
      header.parentNode.parentNode.style.height = '500px';
      ele.className = "minus icon";
    }
    else {
      hidden.style.display = 'none';
      header.parentNode.parentNode.style.height = '160px';
      ele.className = "plus icon";
    }

  }

  addTag = (event) => {
    event.preventDefault();
    let value=this.state.term;
    let tags=this.state.tags;
    tags.push(value);
    this.setState({term:'', tags: tags});
    this.props.passTags(this.props.id, tags);
  }

  render() {
    const name=this.props.fname+" "+this.props.lname;
    const email=this.props.email;
    const company=this.props.company;
    const skill=this.props.skill;
    const average=this.state.avg;
    const image=this.props.pic;
    const grades=this.props.grades;
    const tags=this.state.tags;

    return (
            <div className="item" style={{ height: '160px', width: '100%'}}>
              <div style={{display: 'inline-block', height:'100%', width:'20%'}}>
                <img className="ui small circular bordered image" src={image} alt={name} style={{display: 'block', height: 'auto', width: '70%', margin:'8% 10%'}}/>
              </div>
              <div className="content">
                <div>
                  <span style={{float: 'right'}}><i className="plus icon" onClick={this.expand}></i></span>
                  <span className="ui huge header">{name}</span>
                </div>
                <div className="description" style={{marginLeft: '20px'}}>
                  <p>Email: {email}</p>
                  <p>Company: {company}</p>
                  <p>Skill: {skill}</p>
                  <p>Average: {average}%</p>
                </div>
                <div id="grades" style={{display:'none', marginLeft: '20px'}}>
                  <br />
                  {grades.map((grade, index) => {
                      return <p>Test{index+1}: {grade}%</p>
                    })}
                  <div className="buttons">
                    {tags.map((tag) => {
                      return <button className="ui button">{tag}</button>
                    })}
                  </div>
                  <br />
                  <form className="ui form" onSubmit={this.addTag}>
                    <input type="text" style={{width:"30%"}} placeholder="Add a tag" value={this.state.term} onChange={e => this.setState({ term: e.target.value })}/>
                  </form>
                </div>
              </div>
            </div>
    );
  }
}

export default StudentCard;
