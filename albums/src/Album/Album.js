import React from 'react';


const person = ( props ) => {
    return (
        <tr>
           <td> {props.title}</td>
           <td> {props.artist}</td>
           <td> {props.releaseDate}</td>
           <td> {props.songs}</td>
        </tr>
    )
};
export default person;