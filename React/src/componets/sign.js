import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Fragment } from "react";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import * as actionType from '../reducers/actionType';
import * as server from '../axios/user';



const schema = yup
  .object({
    Name: yup.string().required(),
    Tz: yup.string().required().matches(/\d/, "שדה זה מכיל מספרים בלבד"),
    Phone: yup.string().required().matches(/0?[0-9]?[0-9]-?[0-9]{7}/, "שדה זה מכיל מספר טלפון"),
    Email: yup.string().required().matches(/(.+)@(.+){2,}\.(.+){2,}/, "שדה זה מכיל כתובת אימייל"),
    Username: yup.string().required(),
    Password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/, "סיסמא צריכה להכיל אות גדולה אות קטנה מספר ת6 או 12 תווים"),

  })
  .required()

const Input = ({ lbl, name, control, error }) => {
  return <Fragment>
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TextField {...field} sx={{ width: '300px' }}
        helperText={`הכנס ${lbl} `}
        label={lbl}
        error={error[name]?.message}
      />}
    />
    <p>{error[name]?.message}</p>
  </Fragment>
}

export default function Sign() {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
dispatch(server.addUser({data}))
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
            '& > :not(style)': { m: 1 },
          }}
        >
          <Input control={control} lbl={"שם"} name="Name" error={errors} />
          <Input control={control} lbl={"תעודת זהות"} name="Tz" error={errors} />
          <Input control={control} lbl={"טלפון"} name="Phone" error={errors} />
          <Input control={control} lbl={"מייל"} name="Email" error={errors} />
          <Input control={control} lbl={"שם משתמש"} name="Username" error={errors} />
          <Input control={control} lbl={"סיסמה"} name="Password" type="password" error={errors} />
       


           <Button variant="contained" className="sign" type="submit" > שליחה</Button>
        </Box>
      </form>

    </div>
  )
}

