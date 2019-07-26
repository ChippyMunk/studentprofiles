import React from 'react';
import StudentCard from './StudentCard'

const StudentList =(props)=> {

  const passTags = (id,tags) => {
      props.passTags(id, tags);
  }

  const profiles=props.students.map( profile => {
    console.log(profile.id);
    return  <StudentCard key={profile.id} id={profile.id} fname={profile.firstName} lname={profile.lastName} email={profile.email} company={profile.company}
    skill={profile.skill} grades={profile.grades} pic={profile.pic} passTags={passTags}/>;
  });

  return <div className="ui divided demo items">{profiles}</div>;

};

export default StudentList;
