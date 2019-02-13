import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react'


export default ({styles, handleClick, handleSubmit}) => {
    const args={}

    const handleChange = (ev, input)=>{
        args[input.name] = input.value
        // console.log(args);
    }
    return (
        <div>
            <div  style={styles.box}>
            <h3>Sign up!</h3>
            <Form onSubmit={(ev)=>handleSubmit(ev, args)}>
                <Form.Field>
                <Form.Input name="firstname" onChange={handleChange} placeholder='First name'/>
                </Form.Field>
                <Form.Field>
                <Form.Input name="lastname" onChange={handleChange} placeholder='Last name' />
                </Form.Field>
                <Form.Field>
                <Form.Input name="username" onChange={handleChange} placeholder='Username' icon={<Icon name="user" size="large" />} />
                </Form.Field>  
                <Form.Field>
                <Form.Input name="email" onChange={handleChange} placeholder='email' icon={<Icon name="mail" size="large" />} />
                </Form.Field>
                <Form.Field>
                <Form.Input name="password" type="password" onChange={handleChange} placeholder='Password'/>
                </Form.Field>
                {/* <Form.Field>
                <Form.Input name="passwordConf" type="password" onChange={handleChange} placeholder='Confirm password' />
                </Form.Field> */}
                <Button type='submit' primary fluid>Sign up</Button>
            </Form>

            </div>
            <div  style={styles.box}>
                Already have an account? <Button inverted color="red" onClick={handleClick}>Log in</Button>
            </div>
        </div>
    )
}
