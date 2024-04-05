import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    notificationCount:0,
    newMessageAlert:[{
        chatId:"",
        count:0,
    }]
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        incrementNotification: (state) => {
            state.notificationCount += 1;

        },
        resetNotificationCount: (state) => {
            state.notificationCount = 0;

        },

        setNewMessagesAlert:(state, action)=>{
            const index = state.newMessageAlert.findIndex(
                (item)=> item.chatId === action.payload.chatId
            );

            if(index !== -1){
                state.newMessageAlert[index].count += 1
            } else{
                state.newMessageAlert.push({
                    chatId:action.payload.chatId,
                    count:1
                })
            }
        }
    }
});

export default chatSlice;

export const {
    incrementNotification,
    resetNotificationCount,
    setNewMessagesAlert
   
} = chatSlice.actions