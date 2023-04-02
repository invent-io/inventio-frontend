import { Grid } from '@mui/material';
import { PrivateRoute, SideMenu } from 'components';
import { Historico, Inicio, Itens, Map, Sensores, Usuarios } from 'pages';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './Sistema.module.css';

export default function Sistema() {
  return (
    <Grid container spacing={0} className={styles.pageContainer} wrap="nowrap">
      <Grid item xs={2} minWidth="170px">
        <SideMenu />
      </Grid>
      <Grid item xs={10}>
        <Switch>
          <PrivateRoute exact path="/mapa/:id" component={Map} />
          <PrivateRoute exact path="/itens" component={Itens} />
          <PrivateRoute exact path="/sensores" component={Sensores} />
          <PrivateRoute exact path="/historico" component={Historico} />
          <PrivateRoute exact path="/usuarios" component={Usuarios} />
          <PrivateRoute exact path="/" component={Inicio} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
