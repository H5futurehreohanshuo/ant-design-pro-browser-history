import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row,Col,Card,Form,Input,Select,Button,Badge,Dropdown,Menu,Modal,message,Table,Divider,Radio} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Net.less';

const statusMap = ['default', 'processing', 'success', 'error'];
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

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
    // 查看
  handlexamine = () =>{

  }
  // 签署
  handlesign = () => {

  }
  // 发起签约
  handlestart = () =>{

  }
  // 查询条件组件
  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status',{
                initialValue: '0',
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">全部</Option>
                  <Option value="1">待我签</Option>
                  <Option value="2">代他人签</Option>
                  <Option value="3">待归档</Option>
                  <Option value="4">已归档</Option>
                  <Option value="5">已完成</Option>
                  <Option value="6">已过期</Option>
                  <Option value="7">待发送</Option>
                  <Option value="8">已撤回</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = { selectedRowKeys , onChange: this.onSelectChange };
    const { getFieldDecorator } = this.props.form;

    const status = ["全部","待我签","代他人签","待归档","已归档","已完成","已过期","待发送","已撤回"];
    // let arrs = '' ;
    // for (let i = 0 ; i<status.length ; i++){ arrs += `{ text : "${status[i]}" , value : ${i} },`; }
    // eval('(' + arrs.substring(0,arrs.length-1) + ')');

    const columns = [
      {
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
          { text : "全部",value : 0 },
          { text : "待我签" , value : 1 },
          { text : "代他人签", value : 2 },
          { text : "待归档" , value : 3 },
          { text : "已归档" , value : 4 },
          { text : "已完成" , value : 5 },
          { text : "已过期" , value : 6 },
          { text : "待发送" , value : 7 },
          { text : "已撤回" , value : 8 },
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
            <Button type="primary" onClick={ ()=> this.handlexamine()} style={{marginRight:'10px'}}>查看</Button>
            <Button type="primary" onClick={ ()=> this.handlesign()}>签署</Button>
          </div>
        )
      }
    ];

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };

    return (
      <PageHeaderLayout title="我的网签">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>
            <div style={{ marginBottom: 16 }}>
             <Button type="primary" onClick={ ()=> this.handlestart()}>发起签约</Button>
           </div>
           <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
