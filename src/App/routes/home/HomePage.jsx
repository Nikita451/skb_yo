import React, { PropTypes } from 'react';
import importcss from 'importcss';
import { inject } from 'mobx-react';

import {
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import Component from 'lsk-general/General/Component';
//import Slide from '../Slide';
import Slide from 'lsk-general/General/Slide';
import Link from 'lsk-general/General/Link';

@inject('config', 'app', 'posts')
@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  }
  render() {
    const { site } = this.props.config;
    const {posts} = this.props.posts
    return (
      <div styleName="da">
      <Slide
        //full
        //video="http://skill-branch.ru/video-background.webm"
        image="http://2.bp.blogspot.com/-s5WkB2C1-ig/UiHMU1IbZxI/AAAAAAAAAwI/ooOZcg35OtA/s1600/New+York+City+Wallpapers.jpg"
        overlay
      >
        <Grid>
          <Row>
            <Col md={12} mdOffset={0}>
             <h1>Блок путещественника</h1>
             <p styleName="description">
                Здравствуйте, меня зовут Артур Пирожков. <br /> 
                Я самый красивый человек на планете. <br />
                И, неудивительно, что самый красивый человек на планете <br />
                бывает в самых красивых местах. <br />
                Я посетил девятьсот сорок десять стран! <br />
             </p>
             <p styleName="toReg">
             {!this.props.app.auth.isAuth && 
              <Link href="/auth/signup" className="btn btn-success">Зарегистрироваться</Link>
             }
             </p>
            </Col>
          </Row>
        </Grid>
      </Slide>
      <Slide
        
        image="http://lawedding.com.ua/content/documents/8/759/image/bg-blue.jpg"
        overlay
      >
        <Grid>
          <Row>
            <Col md={12} mdOffset={0}>
              <div styleName='articles'>
                <h3>Список последних статей</h3>
                {posts.map(p => <Link key={p._id} href={`/post/${p._id}`}>{p.header}</Link> )}
              </div>
            </Col>
          </Row>
        </Grid>
      </Slide>
      </div>
    );
  }
}
