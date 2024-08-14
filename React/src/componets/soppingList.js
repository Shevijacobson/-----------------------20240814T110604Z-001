import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import * as server from '../axios/soppingListBuy';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';




const ShopingList = () => {
  const [list, setList] = useState([])

  const user = useSelector(state => state.user.Id)



  React.useEffect(() => {
    (async () => {
      const allItems = await server.getAllItems(user);
      setList(allItems.data)
    })();
  }, []);

  const deleteItem = (e) => {
    server.deleteProduct(user, e)
      .then(x => console.log(x))
      .catch(x => console.log(x))
  }
  const minusItem = (item) => {
    if(item.Count==1)
    {    server.deleteProduct(user,item)
      .then(x => console.log(x))
      .catch(x => console.log(x))}
      else{

         item.Count = item.Count - 1
   
    server.editItem(item)
      .then(x => {
        item.Count = x.data.Count
        const newList = [...list];
        setList(newList)
      })

      .catch(x => console.log(x))
   
    const newList = [...list];
    setList(newList); }
  }
  const plusItem = (item) => {
    item.Count = item.Count + 1
   
    server.editItem(item)
      .then(x => {
        item.Count = x.data.Count
        const newList = [...list];
        setList(newList)
      })

      .catch(x => console.log(x))
  
    const newList = [...list];
    setList(newList);
  }

  //עד כאן...
  return (
    <>
      <br></br>
      <p  className="shoppingTitle">רשימת קניות</p>
      <br></br>
      <Table singleLine >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> +</Table.HeaderCell>
            <Table.HeaderCell> -</Table.HeaderCell>
            <Table.HeaderCell> מוצר</Table.HeaderCell>
            <Table.HeaderCell>כמות</Table.HeaderCell>

            <Table.HeaderCell> מחיקת מוצר</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {list ? list.map((item) =>
            <Table.Row >
              <Table.Cell><IconButton style={{ backgroundColor: "#d1d6d663" }} onClick={() => plusItem(item)}><AddIcon></AddIcon></IconButton></Table.Cell>
              <Table.Cell><IconButton style={{ backgroundColor: "#d1d6d663" }} onClick={() => minusItem(item)}><RemoveIcon></RemoveIcon></IconButton></Table.Cell>
              <Table.Cell>{item.Name}</Table.Cell>
              <Table.Cell>{item.Count}</Table.Cell>
              <Table.Cell><IconButton style={{ backgroundColor: "#d1d6d663" }} ><DeleteIcon onClick={() => deleteItem(item.Id)} /></IconButton></Table.Cell>


            </Table.Row>) : null}
        </Table.Body>
      </Table>

    

    </>
  )
}

export default ShopingList
