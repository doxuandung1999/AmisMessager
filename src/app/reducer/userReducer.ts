// // chúng ta cấn xác định cấu trúc dữ liệu được lưu,
// //  và xử lý thay đổi dữ liệu khi hành động được gọi tới
// import {createSelector, createFeatureSelector} from '@ngrx/store';
// import * as userLogins from '../action/userAction';
// import {User} from "../model/user/user";

// export interface UserState{
//     entities:Array<User>
// }
// const initialState: UserState = {
//     entities:[]
// };

// export function userReducer(state = initialState,action:userLogins.Actions): UserState{
//     switch(action.type){
//         case userLogins.ActionTypes.CHECK_LOGIN:{
//             const  user:User = action.payload;
//             return{
//                 entities:[...state.entities,user]
//             }
//         }
//         case userLogins.ActionTypes.LOGOUT:{
//             return{
//                 ...state,
//                 entities:[]
//             }
//         }
//         default:{
//             return state;
//         }
//     }
// }