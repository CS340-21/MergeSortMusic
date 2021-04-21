import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 350,
    maxWidth: 350,
    height: 500,
  },
  table: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  tabledata: {
    padding: 20,
  },
  main_content_header: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    title: {
      fontWeight: "bold",
      fontStyle: "italic",
      backgroundColor: "transparent",
      textShadow: "3px 3px black",
    }
  },
  John: {
    marginTop: 285,
  },
  Shrey: {
    marginTop: 185,
  }
}));

const Main = (props) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main_content_header}>
        <div style={{ margin: 20, textAlign: "center" }}>
          <p>
              Merge Sort Music is a web utility that allows you to sort your Spotify playlists 
              without bias utilizing a nifty merge sort. Create an account or log in to get started!
          </p>
        </div>
        <img
          src="https://i.imgur.com/HU2tfzo.gif"
          alt="merge sort"
          style={{ padding: "10px" }}
        />
        <Divider />
        <Divider />
        <h1 className="title">Meet the Team</h1>
        <table className={classes.table}>
          <tr>
            <td className={classes.tabledata}>
              <Card className={classes.card}>
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    alt="Shreyank Patel"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png"
                    title="Contemplative Reptile"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shreyank Patel
                    </Typography>
                    <Typography component="p">
                    Shreyank Patel is a senior majoring in Computer Science and Economics.
                    He enjoys running, and cooking. His areas of interest include Machine Learning and Cryptography.
                    He has prior experience designing websites using HTML, CSS, Javascript and React. 
                    Through this project he hopes to gain meaningful experience in Bootstrap, 
                    Django and other frameworks.</Typography>
                    <Button 
                      size="small" 
                      color="primary" 
                      href="https://github.com/spatel912020"
                      className={classes.Shrey}>Github</Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </td>
            <td className={classes.tabledata}>
              <Card className={classes.card}>
                <CardActionArea> 
                  {/* <CardMedia
                    component="img"
                    alt="John Carmack"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png"
                    title="Contemplative Reptile"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      John Carmack
                    </Typography>
                    <Typography component="p">
                      John enjoys art and Brazillian Jiu-Jitsu.
                      He loves learning about web development and is using this
                      project to learn more about react.

                      Click on the link below to check out his portfolio!
                    </Typography>
                    <Button 
                      size="small" 
                      color="primary" 
                      href="https://pokemonpower92.github.io/portfolio/"
                      className={classes.John}
                    >
                      Personal Site
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </td>
            <td className={classes.tabledata}>
              <Card className={classes.card}>
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    alt="Jonathan Ting"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png"
                    title="Contemplative Reptile"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Jonathan Ting
                    </Typography>
                    <Typography component="p">
                    Jonathan Ting is a senior studying Computer Engineering currently doing 
                    undergraduate research in hardware security. However, as a hobby, 
                    he also enjoys dabbling in web development, both with backend frameworks 
                    such as Django and frontend frameworks such as Bootstrap. 
                    This project will fulfill a wish of his, to optimize the process
                     of sorting music playlists, of which there are not many great tools 
                     for at the moment.  
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </td>
            <td className={classes.tabledata}>
              <Card className={classes.card}>
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    alt="Georgia Stricklen"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://cdn11.bigcommerce.com/s-7va6f0fjxr/images/stencil/1280x1280/products/52608/68847/Mom-Stick-Figure-34-Vinyl-Decal-Sticker__25452.1506203851.jpg?c=2"
                    title="Contemplative Reptile"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Georgia Stricklen
                    </Typography>
                    <Typography component="p">
                    Georgia Stricklen is a Junior at the University of Tennessee, majoring in Computer Science. 
                    Her main focus is C++ and Java with some experience in Python. She enjoys reading and video games. 
                    Solving real world problems while bettering existing structures is what she hopes 
                    to work towards in her career as a Computer Scientist. 
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Main;
