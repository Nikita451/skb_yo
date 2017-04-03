import React, { Component } from 'react';
import {inject, observer} from 'mobx-react'
import { Row, Col, Card, CardBlock, Modal, Button } from 'react-bootstrap';
import TinyMCE from 'react-tinymce'

@inject('posts', 'user')
@observer
export default class PostsPage extends Component {

  constructor(props) {
    super(props)
    this.newText = ""
    this.state = {
      showModal: false,
    }
  }

   handleEditorChange = (e) => {
      this.newText =  e.target.getContent()
  }

  saveText = (e) => {
      e.preventDefault()
      if (!this.newText) {
          //this.props.onEditTextFinish()
          return
      }
      let post = {
        header: this.refs.header.value,
        text: this.newText,
        user: this.props.user._id,
      } 
      let Post = this.props.posts.Post
      this.props.posts.add( new Post( post.header, post.text, post.user ) )
      
      this.close()
      return false;
  }
  
  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    const {posts} = this.props.posts
    return (
      <div>
      <Row>
        <Col md={6} xs={12} >
          <button onClick={this.open} className="btn btn-info">Новая публикация</button>
        </Col>
      </Row>
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              {posts.length == 0 && <p> Здесь будут твои публикации </p>} 
              {posts.map( post => <p> {post.header} | {post.text} |r {post.user} </p> )}
            </CardBlock>
          </Card>
        </Col>
      </Row>

      <Modal enforceFocus={false} show={this.state.showModal} bsSize="lg" onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title> Новая публикация </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.saveText}>
              <div className="form-group">
                <label htmlFor="header">Заголовок:</label>
                <input required ref="header" type="text" className="form-control" name="header" id="header" />
              </div>
              <div className="form-group">
                <label htmlFor="text">Текст публикации</label>
                <TinyMCE
                    content={""}
                    ref="editor"
                    config={{
                        theme: "modern",
                        language: "ru",
                        image_advtab: true,
                        default_link_target:"_blank",
                        target_list: [
                            {title: 'Открывать в текущем окне', value: '_self'},
                            {title: 'Открывать в новом окне', value: '_blank'},
                        ],
                        
                    /*plugins: [
                        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                        "searchreplace wordcount visualblocks visualchars code fullscreen",
                        "insertdatetime media nonbreaking save table contextmenu directionality",
                        "emoticons template paste textcolor colorpicker textpattern imagetools"
                    ],*/
                    plugins: "link preview paste textcolor",
                    toolbar: "insertfile undo redo | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | fontsizeselect",
                    menu: {
                        edit: {title: 'Edit', items: 'cut copy paste'},
                        insert: {title: 'Insert', items: 'link'},
                        view: {title: 'View', items: 'preview'},
                    },
                    }}
                    onChange={this.handleEditorChange}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success">Опубликовать</button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Отмена</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
