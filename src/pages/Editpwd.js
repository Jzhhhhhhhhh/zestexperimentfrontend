import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select, Modal, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import {
    fetchPassword,
} from '@actions/common'

const FormItem = Form.Item
const Option = Select.Option

@connect((state, props) => ({
    config: state.config,
}))

@Form.create({})

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkConfirm = this.checkConfirm.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
    }


    // 组件已经加载到dom中
    componentDidMount() {

    }

    // 提交表单数据
    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((errors, fieldsValue) => {
            if (errors) {
                return
            }
            const values = {
                oldPwd: fieldsValue.oldPwd ? fieldsValue.oldPwd : '',
                password: fieldsValue.password ? fieldsValue.password : '',
            };
            this.submitLoading = true
            this.props.dispatch(fetchPassword({
                ...values,
            }, (res) => {
                message.success(res.msg)
                this.submitLoading = false
                this.setState({})
                this.props.onCancel()
            }, (res) => {
                message.warning(res.msg)
                this.props.form.setFields({ oldPwd: '', password: '', confirm: '' })
                this.submitLoading = false
                this.setState({})
            }))

            // this.props.form.resetFields()
        });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('no')
        } else {
            callback()
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    // 弹窗的footer
    renderFooter() {
        return (
            <div>
                <Button type="primary" size="large" onClick={this.handleSubmit} loading={this.submitLoading}>确定</Button>
                <Button size="large" onClick={this.props.onCancel}>取消</Button>
            </div>
        )
    }

    render() {
        const imageUrl = this.state.imageUrl
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
            hasFeedback: true,
        }
        return (
            <Modal
                className=""
                visible={this.props.visible}
                title="修改密码"
                onCancel={this.props.onCancel}
                footer={this.renderFooter()}
            >
                <div className="modalcontent">
                    <Form layout="horizontal" autoComplete="off">
                        <Row>
                            <Col span="24">
                                <FormItem {...formItemLayout} label="pwd">
                                    {getFieldDecorator('oldPwd', {
                                        rules: [
                                            { required: true, message: 'enter the pwd！' },
                                            { pattern: regExpConfig.pwd, message: '!' },
                                            { validator: this.checkConfirm },
                                        ],
                                        // validateTrigger: 'onBlur',
                                    })(<Input type="password" placeholder="" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <FormItem {...formItemLayout} label="">
                                    {getFieldDecorator('password', {
                                        rules: [
                                            { required: true, message: '！' },
                                            { pattern: regExpConfig.pwd, message: '!' },
                                            { validator: this.checkConfirm },
                                        ],
                                        // validateTrigger: 'onBlur',
                                    })(<Input type="password" placeholder="" />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <FormItem {...formItemLayout} label="">
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            { required: true, message: '！' },
                                            { pattern: regExpConfig.pwd, message: '!' },
                                            { validator: this.checkPassword },
                                        ],
                                        // validateTrigger: 'onBlur',
                                    })(<Input type="password" placeholder="" />)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        )
    }
}