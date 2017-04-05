import React from 'react'
import importcss from 'importcss'
import dateFormat from 'dateformat'
import {inject} from 'mobx-react'

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

@inject('user')
@importcss(require('./PostPage.css'))
export default class PostPage extends React.Component {

    renderNotFound() {
        return (
           <div styleName="detail">
                    <Slide
                        full
                        image="http://2.bp.blogspot.com/-s5WkB2C1-ig/UiHMU1IbZxI/AAAAAAAAAwI/ooOZcg35OtA/s1600/New+York+City+Wallpapers.jpg"
                        overlay
                    >
                        <Grid>
                        <Row>
                            <Col md={12} mdOffset={0}>
                            <h1> Страница не найдена :( </h1>
                            </Col>
                        </Row>
                        </Grid>
                    </Slide>
                </div>
        )
        
    }

    getAuthor(post) {
        const profile = post && post.user && post.user.profile || null
        if (profile) {
            const {firstName, lastName} = profile
            return `${firstName} ${lastName}`
        } else if (this.props.user && this.props.user.profile ) {
            const {firstName, lastName} = this.props.user.profile
            return `${firstName} ${lastName}`
        } else return ""
    }
    
    render() {
        const {post} = this.props
        if (!post) return this.renderNotFound()
        
        return (
              <div styleName="detail">
                    <Slide
                        full
                        image="http://2.bp.blogspot.com/-s5WkB2C1-ig/UiHMU1IbZxI/AAAAAAAAAwI/ooOZcg35OtA/s1600/New+York+City+Wallpapers.jpg"
                        overlay
                    >
                        <Grid>
                        <Row>
                            <Col md={12} mdOffset={0}>
                            <div styleName="toMain">
                                <Link href="/" className="btn btn-info"> На главную </Link>
                            </div>
                            <h1> {post.header} </h1>
                            <p styleName="description" dangerouslySetInnerHTML={{__html: post.text}}>
                            </p>
                            <div styleName="dopInfo">
                               <p styleName="date"> Опубликовано: <span> { dateFormat(new Date( post.updatedAt ), "dd.mm.yyyy, HH:MM:ss") } </span> </p>
                               <p styleName="author"> Автор: <span> {this.getAuthor(post)} </span>  </p>
                            </div>
                            <div styleName="toMain">
                                <Link href="/" className="btn btn-info"> На главную </Link>
                            </div>
                            </Col>
                        </Row>
                        </Grid>
                    </Slide>
                </div>
        )
    }
}
