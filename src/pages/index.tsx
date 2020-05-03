import * as React from 'react';
import {useStyletron} from 'baseui';
import {Grid, Cell} from 'baseui/layout-grid';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import {Heading, HeadingLevel} from 'baseui/heading';
import {Paragraph3} from 'baseui/typography';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import fetch from 'isomorphic-unfetch';
import {Check, ChevronRight} from 'baseui/icon';
import {ListItem} from 'baseui/list';
import useSWR from 'swr'
import {StatefulMenu} from 'baseui/menu';
import {
  ListItemLabel,
  MenuAdapter,
  ARTWORK_SIZES,
} from 'baseui/list';
import { Avatar } from "baseui/avatar";
import  {useState } from 'react';
import axios from 'axios';


const API_URL = '/api/cla';



export default class Index extends React.Component{

  state = {
    username: "" as string,
    code: "" as string,
    data: {contributors: []} as any
  }

  constructor(prop){
    super(prop)
    this.getContributor();

    this.getContributor = this.getContributor.bind(this)
    this.changeCode = this.changeCode.bind(this)
    this.changeUsername = this.changeUsername.bind(this)


  }
  
  componentDidMount() {

  }

  getContributor(){
    axios.get(API_URL)
      .then(res => {
        const data = res.data;
        this.setState({ data: data });
      })
  }

 changeUsername(event){
   this.setState({username: event.target.value})
 }
 changeCode(event){
   console.log(event.target.value)
  this.setState({code: event.target.value})
}

 addUser(){

  console.log("POST _> ")
  axios({
    method: 'post',
    url:  API_URL,
    data:{
      username: this.state.username,
      code: this.state.code
    }
  })
    .then(res => {
      const data = res.data;
      console.log(JSON.stringify(data))
      if (data.success){
        alert("> CLA für Nuter " + this.state.username + " hinzugefügt!")
        this.setState({
          username : "",
          code: ""
        })

        this.getContributor();
      }
    })
 }


render(){


  return (
    <div>
        <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>Support++ GitHub CLA</StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
  
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button>GitHub CLA Folder</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
      
      <Grid>
      <Cell span={[12]}>
  <br/>
  <br/>
  <Grid>
      <Cell span={[11]}>
      <FormControl
        label={() => "GitHub Username"}
        caption={() => "Sind Sie sicher? - Kontrollieren Sie lieber nochmal ob die Checksum stümmt."}
      >
      <Input 
        value={this.state.username}
        onChange={e => this.changeUsername(e)}
      />
    </FormControl>
    </Cell>
    <Cell span={[1]}>
    <br/>
  <br/>
    <Avatar
          name={this.state.username}
          size="scale1200"
          src={"https://github.com/"+ this.state.username+ ".png?size=200"}
        />
        </Cell>
        <Cell span={[11]}>
    <FormControl
      label={() => "GPassword"}
    >
      <Input     
        type="password"
        onChange={e => this.changeCode(e)} 
        value={this.state.code}/>
    </FormControl>

     
      <Button  onClick={() => this.addUser()}>Hinzufügen</Button>

  
      <ul>
    <HeadingLevel>
      <Heading styleLevel={2}>CLI SIGN</Heading>
    </HeadingLevel>
    {this.state.data.contributors.map(con=>{
      console.log("RELOAD")
      return(
        <ListItem
        key={con}
        endEnhancer={() => (
          <Avatar
          name={con}
          size="scale1200"
          src={"https://github.com/"+ con+ ".png?size=200"}
        />
        )}
      >
        <ListItemLabel><StyledLink href={"https://github.com/"+ con} target="_blank">{con}</StyledLink></ListItemLabel>
      </ListItem>
      )
    })}
     
     
    </ul>
      </Cell>
    </Grid>
    </Cell>
 </Grid>
    </div>
  );


}
 //https://github.com/npm.png?size=200
}