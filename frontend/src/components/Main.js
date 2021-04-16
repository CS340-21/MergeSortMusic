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
    maxWidth: 350,
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
}));

const Main = (props) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main_content_header}>
        <h1 className={classes.title}>About Us</h1>
        <div style={{ margin: 20, textAlign: "left", textIndent: "50px" }}>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
            Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit
            amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
            ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim
            in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id
            cursus faucibus, tortor neque egestas augue, eu vulputate magna eros
            eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
            porttitor, facilisis luctus, metus Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit
            amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
            ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit
            amet est et sapien ullamcorper pharetra. Vestibulum erat wisi,
            condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean
            fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci,
            sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
            facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus,
            tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
            erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
            facilisis luctus, metus
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
                  <CardMedia
                    component="img"
                    alt="Shreyank Patel"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shreyank Patel
                    </Typography>
                    <Typography component="p">Stuff about me</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </td>
            <td className={classes.tabledata}>
              <Card className={classes.card}>
                <CardActionArea> 
                  <CardMedia
                    component="img"
                    alt="John Carmack"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      John Carmack
                    </Typography>
                    <Button 
                      size="small" 
                      color="primary" 
                      href="https://pokemonpower92.github.io/portfolio/"
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
                  <CardMedia
                    component="img"
                    alt="Jonathan Ting"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Jonathan Ting
                    </Typography>
                    <Typography component="p">
                      Stuff about Jonathan Ting
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </td>
            <td className={classes.tabledata}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Georgia Stricklen"
                    className={classes.media}
                    height="200"
                    style={{ objectFit: "scale-down" }}
                    image="https://cdn11.bigcommerce.com/s-7va6f0fjxr/images/stencil/1280x1280/products/52608/68847/Mom-Stick-Figure-34-Vinyl-Decal-Sticker__25452.1506203851.jpg?c=2"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Georgia Stricklen
                    </Typography>
                    <Typography component="p">
                      Stuff about Georgia Stricklen
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
