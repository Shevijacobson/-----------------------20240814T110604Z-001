import { Controller, useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Fragment } from "react";
import Button from '@mui/material/Button';
import * as React from 'react';
import * as server from '../axios/categories';
import { MenuItem, Select } from "@mui/material";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import * as serverRecipe from '../axios/Recipe';





const schema = yup
  .object({
    Name: yup.string().required(),
    Description: yup.string().required(),
    Duration: yup.string().matches(/\d/, "שדה זה מכיל מספרים בלבד").required(),
    Img: yup.string().required().matches(/http(|s):.*\.(jpg|png|jpeg|gif)/g, "שדה זה מכיל כתובת קישור לתמונה"),
    //לעשות שדה חובה בחירת בקושי
 
    Ingrident: yup.array().of(
      yup.object().shape({
        Name: yup.string().required(),
        Count: yup.number().required(),
        Type: yup.string().required(),
      })
    )
    ,
    Instructions: yup.array().of(yup.string().required()),

  }).required()



const Input = ({ lbl, name, control, error }) => {
  return <Fragment>
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TextField {...field} sx={{ width: '350px' }}
        helperText={`הכנס ${lbl} `}
        label={lbl}
        error={error[name]?.message}
      />}
    />
    <p>{error[name]?.message}</p>
  </Fragment>
}

export default function UpdateRecipe() {
  const userId = useSelector(state => state.user.Id)
  const [isCategory, setIsCategory] = React.useState(false);
  const [categoryArr, setCategoryArr] = React.useState([]);
  const [correctCategory, setCorrectCategory] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const thisRecipe = useSelector(state => state.currentRecipe)


  //קבלת כל הקטגוריות
  React.useEffect(() => {

    server.getAllCategory().then(x => {
      const data = x.data.map(x => ({ ...x, value: x.Id, label: x.Name }))
      setCategoryArr(data)

    })
      .catch(E => console.error(E))

  }, [])

  React.useEffect(() => {
    if (pathname === "/addRecipe") {
      reset({
        Instructions: [""],
        Ingrident: [{}],
        Name: "",
        Description: "",
        Img:"",
        Duration:"",
        Difficulty:"",
        CategoryId:"",
      }

      )
    }
  }, [pathname])

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,

  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: pathname == "/addRecipe" ?
      {
        Instructions: [{}],
        Ingrident: [{}]
      } : thisRecipe,



  })

  const { append: append1, fields: fildes1, remove: remove1 } = useFieldArray({
    name: "Instructions",
    control: control,
  })
  const { append: append2, fields: fildes2, remove: remove2} = useFieldArray({
    name: "Ingrident",
    control: control,
  })


  let categoryData = {};
  let addCategory1 = "";

  const checkCategory = async (data) => {

    if ((!data.newCategory || !data.CategoryId)) {

      if (!data.newCategory && !data.CategoryId) {

        setIsCategory(true)
        alert(isCategory)
      }
      if (data.newCate0gory) {

        addCategory1 = data.newCategory;
        categoryData = await server.addCategory({ addCategory1 })
          .then(x => {
            data.CategoryId = x.data.Id;

            setCorrectCategory(true);
          })
          .catch(E => { alert(E.response.data); })
      }
      delete data.newCategory;
      setCorrectCategory(true);
    }
    else
      setIsCategory(true)
  }

  const onSubmit = (data) => {
    if (pathname == "/addRecipe") {
      checkCategory(data);
      setTimeout(() => {
        if (correctCategory) {
      
          data.UserId = userId;
          // קריאת שרת הוספת מתכון
          console.log(data)
          serverRecipe.addRecipe({ data })
            .then((x) => {
              alert(`✅המתכון נוסף לרשימה בהצלחה! `)
              navigate('/recipes');

            })
            .catch((E) => alert(E.response.data))
        }
      }, (1000));
    }

    else {
      alert("else")
      serverRecipe.editRecipe({ data }).then((x) => {
        alert(`✅המתכון עודכן בהצלחה! `)
        navigate('/recipes');
      })
        .catch((E) => alert(E.response.data))

    }

  }
  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>


        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "800px",
            alignItems: 'center',
            '& > :not(style)': { m: 1 }
          }}
        >
          <Input control={control} lbl={"שם"} name="Name" error={errors} />
          <Input control={control} lbl={"תיאור המתכון"} name="Description" error={errors} />
          <Input control={control} lbl={"קישור לתמונה"} name="Img" error={errors} />
          <Input control={control} lbl={"זמן הכנה בדקות"} name="Duration" error={errors} type="number" />


          <p>בחר קטגוריה</p>
          <Controller
            name="CategoryId"
            control={control}
            error={errors["CategoryId"]?.message}
            render={({ field }) => <Select
              placeholder="בחר קטגוריה"
              {...field}
            >

              {categoryArr.map(x => <MenuItem value={x.Id} key={x.Id}>{x.Name}</MenuItem>)}
            </Select>}
          />
          <p>{errors["CategoryId"]?.message}</p>

          <Input control={control} lbl={"הוספת קטגוריה"} name="newCategory" error={errors} />

          {isCategory ?
            <p className="errorCategory" >חובה לבחור קטגוריה או לבחור קטגוריה חדשה</p> : null}


          <p>בחר רמת קושי</p>
          <Controller
            name="Difficulty"
            control={control}
            error={errors["Difficulty"]?.message}
            render={({ field }) => <Select
              placeholder="בחר רמת קושי"
              {...field}

            >

              <MenuItem value="1" key="1">1</MenuItem>
              <MenuItem value="2" key="1">2</MenuItem>
              <MenuItem value="3" key="1">3</MenuItem>

            </Select>}
          />

          <p>{errors["Difficulty"]?.message}</p>



          {fildes1.map((x, index) => <Fragment key={x.id} >
            <Input control={control} lbl={"הוראות"} name={`Instructions.${index}`} error={errors} />
               <p>   {errors?.Instructions?.[index]?.message}</p>
            <Button variant="contained" type="button" onClick={() => remove1(index)}>מחיקה</Button> </Fragment>)}
          <Button variant="contained" type="button" onClick={() => append1(" ")}> הוראה נוספת</Button>
          <br></br>
          <br></br>
          <br></br>
          {fildes2.map((x, index) => <Fragment key={x.id}>
            <Input control={control} lbl={"שם המוצר"} name={`Ingrident.[${index}].Name`} error={errors} />
            <p>   {errors?.Ingrident?.[index]?.Name?.message}</p>
            <Input control={control} lbl={"כמות המוצר"} name={`Ingrident.[${index}].Count`} error={errors} />
            <p>   {errors?.Ingrident?.[index]?.Count?.message}</p>
            <Input control={control} lbl={"סוג הכמות"} name={`Ingrident.[${index}].Type`} error={errors} />
            <p>   {errors?.Ingrident?.[index]?.Type?.message}</p>

            <Button variant="contained" type="button" onClick={() => remove2(index)}>מחיקת מוצר</Button>        </Fragment>)}
          <Button variant="contained" type="button" onClick={() => append2({})}> הוספת מוצר</Button>


        </Box>

        <Button variant="contained" className="sign" type="submit" > שליחה</Button>
      </form>

    </div>
  )
}