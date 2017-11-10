import socket from '../socket.js'

const mainReducer = (state = {
    view: "home",
    userMenu: "hidden",
    auth: {
        authObject: {
            username: "",
            password: ""
        },
        create: false,
        signIn: false
    },

}, action) => {
    let newState = {...state};
    switch(action.type){

        case 'HANDLE_SIGN_IN': // Sends state's authObject to the database and receives a response.
            newState.auth.user = true;
            /*
            let pushSubmit = new XMLHttpRequest();
            pushSubmit.open('POST', 'http://localhost:7000/api/signin', false);
            pushSubmit.setRequestHeader("Content-Type", "application/json");
            pushSubmit.onreadystatechange = function () {
                console.log('onreadystatechange')
                if (this.readyState === 4 && this.status === 200) {

                        let user = JSON.parse( pushSubmit.response);
                        newState.auth.authObject = user;
                        if(user.type === "admin"){
                            newState.auth.admin = true;
                            newState.auth.user = true;
                        }
                        else if(user.type === "user"){
                            newState.auth.admin = false;
                            newState.auth.user = true;
                        }
                        console.log(user)

                }
            };
            pushSubmit.send(JSON.stringify(newState.auth.authObject));
            */
            return newState;

        case 'HANDLE_SIGN_OUT': // Sends state's authObject to the database and receives a response.

            newState.auth.user = false;
            newState.auth.signIn = false;
            newState.userMenu = "hidden";
            /*
            let signOutReq = new XMLHttpRequest();
            signOutReq.open('POST', 'http://localhost:7000/api/signout', false);
            signOutReq.setRequestHeader("Content-Type", "application/json");
            signOutReq.onreadystatechange = function () {
                console.log('onreadystatechange')
                if (this.readyState === 4 && this.status === 200) {

                        let user = JSON.parse( signOutReq.response);
                        newState.auth.authObject = {
                        username: "",
                            password: "",
                            signedIn: false,
                            type: ""
                    };
                            newState.auth.admin = false;
                            newState.auth.user = false;
                            newState.view = "home"
                }
            }
            signOutReq.send(JSON.stringify(newState.auth.authObject));
            */

            return newState;

            case 'CHANGE_VIEW': //Changes website view based on the click's (event) data-id (event.target.getAttribute) which contains a message to this reducer.
            if(action.payload.target.getAttribute('data-id') === 'signIn' || action.payload.target.getAttribute('data-id') === 'create'){
                let bool = true;
                if(newState.auth[action.payload.target.getAttribute('data-id')] === true){
                    bool = false
                }
                else{
                    bool = true;
                }
                newState.auth.signIn = false;
                newState.auth.create = false;
                newState.auth[action.payload.target.getAttribute('data-id')] = bool;
                console.log('changed auth type')
            }
            if(action.payload.target.getAttribute('data-id') !== 'signIn' && action.payload.target.getAttribute('data-id') !== 'create') {
                newState = {...newState, view: action.payload.target.id};
                newState.auth.signIn = false;
                newState.auth.create = false;
            };

            return newState;



            case 'HANDLE_CREATE_ACCOUNT': // Sends state's authObject to the database, which then creates an account.
                 let userToAdd = newState.auth.authObject;
                 socket.emit('system-add-user', userToAdd)

                 return newState;

            case 'UPDATE_AUTH_OBJECT': // Updates state's authObject when user modifies the input fields under a sign in or create account session.
                newState.auth.authObject[action.payload.target.getAttribute('data-id')] = action.payload.target.value;

                return newState;

            default:
                return newState;
            }



}
export default mainReducer;