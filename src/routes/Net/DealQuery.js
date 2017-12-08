import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row,Col,Card,Form,Input,Select,Button,Badge,Dropdown,Menu,Modal,message,Table,Divider,Radio,DatePicker} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Net.less';

const statusMap = ['default', 'processing', 'success', 'error'];
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const RangePicker = DatePicker.RangePicker;

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    no: `8975${i}`,
    type: (i % 2 == 0 ) ? "偶数" : "奇数",
    title: `Long Long Ago ${i} Year`,
    power: `甲方 ${i}`,
    name: `已方 ${i}`,
    status: Math.floor( (i/2) ),
    sponTime: 320198888 + (i*1000),
    handle : i
  });
}

@Form.create()

export default class Net extends PureComponent {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    visible : false
  };
  // 查询
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  }
  // 显示 关闭 modal
  visibleModal = (i,vis) => {
    this.setState({
      visible: !!vis,
    });
  }
  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  }
  // 筛选
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  // 查询条件组件
  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="规则编号:">
              {getFieldDecorator('no')(
                <Input placeholder="请输入编号" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="签约BD:">
              {getFieldDecorator('no')(
                <Input placeholder="请输入编号" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="协议类型:">
              {getFieldDecorator('type',{
                initialValue: '',
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  <Option value="0">囿享家</Option>
                  <Option value="1">囿创客</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status',{
                initialValue: '0',
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="0">全部</Option>
                  <Option value="1">待归档</Option>
                  <Option value="2">已归档</Option>
                  <Option value="3">已完成</Option>
                  <Option value="4">已撤销</Option>
                  <Option value="5">已拒绝</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem>
              {getFieldDecorator('time',{
                initialValue: '0',
              })(
                <Select style={{ width: '30%' }}>
                  <Option value="0">请选择时间类型</Option>
                  <Option value="1">协议发起时间</Option>
                  <Option value="2">协议归档时间</Option>
                  <Option value="3">协议发布时间</Option>
                </Select>
              )}
              <RangePicker style={{ width: '70%' }}/>
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  //
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const { getFieldDecorator } = this.props.form;

    const status = ["全部","待归档","已归档","已完成","已撤销","已拒绝"];

    const columns = [{
      title: '协议编号',
      dataIndex: 'no',
    },
    {
      title: '协议类型',
      dataIndex: 'type',
    },
    {
      title: '协议标题',
      dataIndex: 'title',
    },
    {
      title: '签约方',
      dataIndex: 'power',
    },
    {
      title: '签约经理',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        { text : status[0], value : 0 },
        { text : status[1], value : 1 },
        { text : status[2], value : 2 },
        { text : status[3], value : 3 },
        { text : status[4], value : 4 },
        { text : status[5], value : 5 },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      }
    },
    {
      title: '发起时间',
      dataIndex: 'sponTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'handle',
      render: (i) => (
        <div>
          <Button type="primary" onClick={ ()=> this.visibleModal(i,true) }>查看</Button>
        </div>
      )
    }];

    return (
      <PageHeaderLayout title="协议查询">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>
            <Modal title="协议内容"
               visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={ () => this.visibleModal(1,false) } >
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="业务类型">
                  {getFieldDecorator('yewu')(
                    <Select style={{ width: '100%' }}>
                      <Option value="">请选择合同类型</Option>
                      <Option value="1">囿创客</Option>
                    </Select>
                  )}
                </FormItem>
              </Form>
            </Modal>
            <Table columns={columns} dataSource={data} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
