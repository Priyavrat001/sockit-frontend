import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layouts/admin/AdminLayout'
import Table from '../../components/shared/admin/Table'
import { dashboardData } from '../../constants/sampleData'
import { fileFormat, transformImage } from '../../lib/features'
import moment from 'moment'
import { Avatar, Box, Stack } from '@mui/material'
import RenderContent from "../../components/shared/RenderContent";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {

      const {attachments} = params.row;

      return attachments?.length>0? attachments.map((i)=>{

        const url = i.url;
        const file = fileFormat(url)

        return <Box>
          <a href={url} download target='_blank' style={{
            color:"black"
          }}>

            {RenderContent(file, url)}
          </a>
        </Box>
      }) :"No Attachments"

      return <Avatar alt={params.row.name} src={params.row.avatar} 
      />}

  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />

      <span>{params.row.sender.name}</span>
    </Stack>


  },
  {
    field: "chats",
    headerName: "Chats",
    headerClassName: "table-header",
    width: 220
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250
  },
]

const MessageMangement = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.messages.map(i=>({...i, id: i._id, sender: {
      name: i.sender.name,
      avatar: transformImage(i.sender.avatar, 50)
    },
    createdAt: moment(i.createdAt).format("MMM Do YYYY, h:mm:ss a")
   })))
   }, [])

  return (
    <AdminLayout>
      <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>

    </AdminLayout>
  )
}

export default MessageMangement


