import React, { useState } from 'react';
import apiRequest from './ApiRequest'
import {reactLocalStorage} from 'reactjs-localstorage';

const UploadFIle = ({setInvestors, apiextension})=> {
//   function constructor(props) {
//     super(props);

//     this.state = {
//       imageURL: '',
//     };

//     this.handleUploadImage = this.handleUploadImage.bind(this);
//   }
// accounting/investors/upload
const [uploadInput, setUploadInput] = useState([])
const [fileName, setFileName] = useState([])

  function handleUploadImage(ev) {
    ev.preventDefault();
    let cookie = reactLocalStorage.get('cookie')

    const data = new FormData();
    data.append('file', uploadInput.files[0]);
    data.append('filename', fileName.value);
// console.log(value)
// fetch(`http://localhost:5000/${apiextension}`, {
  fetch(`https://distributionresolutionapi.com/${apiextension}`, {
    method: 'POST',
      body: data,
      headers: { 
      'x-access-token': cookie
      },

    }).then(async( response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `http://localhost:5000/${body.file}` });
    //   });
        const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.error('There was a response!', response);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            // this.setState({ postId: data.id })
            console.error('There was data!', data);

    //   console.log(await response.json())
      setInvestors(data)
    });
    console.log(data)

  }
 
    return (
      <form onSubmit={handleUploadImage}>
        <div>
          <input ref={(ref) => { setUploadInput(ref) }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { setFileName(ref) }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        {/* <img src={this.state.imageURL} alt="img" /> */}
      </form>
    );
  }

export default UploadFIle;


// import React from 'react';
// import apiRequest from './ApiRequest'

// class UploadFIle extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       imageURL: '',
//     };

//     this.handleUploadImage = this.handleUploadImage.bind(this);
//   }
//   state = {
//     // Now the state is duplicated because clickCounter lives both
//     // inside Button and App. You could just leave the clickCounter in
//     // App and remove it from Button. Then you would also pass the
//     // clickCounter to Button as props as you pass it to Info.
//     // This way state would not be duplicated and in general it is advised
//     // in React to not duplicate state.
//     clickCounter: 0
//   };
//   handleUploadImage(ev) {
//     ev.preventDefault();

//     const data = new FormData();
//     data.append('file', this.uploadInput.files[0]);
//     data.append('filename', this.fileName.value);
// // console.log(value)
//     fetch('http://localhost:5000/accounting/upload', {
//       method: 'POST',
//       body: data,
//     }).then(async( response) => {
//     //   response.json().then((body) => {
//     //     this.setState({ imageURL: `http://localhost:5000/${body.file}` });
//     //   });
//       console.log(await response.json())
//     });
//     // let info = {"state": state,
//     // 'country': country,
//     // 'street': street,
//     // 'number':num,
//     // 'apt':apt,
//     // 'ptype_id': ptype_id 
                
//     //            }
//     console.log(data)
//     // let  a = apiRequest('POST',data,`/accounting/upload`)

//   }
// //   const SendApi = (e) => {
// //     //   e.preventDefault();
// //       let info = {"state": state,
// //       'country': country,
// //       'street': street,
// //       'number':num,
// //       'apt':apt,
// //       'ptype_id': ptype_id 
                  
// //                  }
// //       let a = apiRequest('POST',info,`/property/${company.id}/${deal.id}`)
// //       navigate(0)
// //     } 
//   render() {
//     return (
//       <form onSubmit={this.handleUploadImage}>
//         <div>
//           <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
//         </div>
//         <div>
//           <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
//         </div>
//         <br />
//         <div>
//           <button>Upload</button>
//         </div>
//         <img src={this.state.imageURL} alt="img" />
//       </form>
//     );
//   }
// }

// export default UploadFIle;