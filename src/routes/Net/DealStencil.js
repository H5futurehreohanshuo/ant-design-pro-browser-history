import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,Col,Card,Form,Icon,
  Input,Select,Button,Badge,
  Dropdown,Menu,Modal,message,
  Table,Divider,Radio,Upload
} from 'antd';
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
    type: (i % 2 == 0 ) ? "囿享家" : "囿创客",
    title: `囿创客_一线城市_投资合作协议书`,
    power: (i % 2 == 0 ) ? "是" : "否",
    name: (i % 2 == 0 ) ? "是" : "否",
    versions: "v1.0",
    status: (i % 2 == 0 ) ? "有效" : "无效",
    handle : i
  });
}

@connect(state => ({
  rule: state.rule,
}))
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
  visibleModal = (vis) => {
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
          <Col md={8} sm={24}>
            <FormItem label="协议名称">
              {getFieldDecorator('no')(
                <Input placeholder="请输入协议名称" />
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
  // 提交
  handleOk = () =>{
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  //上传
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        title: '协议类型',
        dataIndex: 'type',
      },
      {
        title: '协议模板名称',
        dataIndex: 'title',
      },
      {
        title: '一线城市',
        dataIndex: 'power',
      },
      {
        title: '城市代理',
        dataIndex: 'name',
      },
      {
        title: '版本号',
        dataIndex: 'versions',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '操作',
        dataIndex: 'handle',
        render: (i) => (
          <div>无效</div>
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
             <Button type="primary" onClick={ ()=> this.visibleModal(true)}>新增模板</Button>
             <Modal title="新增模板"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={ () => this.visibleModal() }
                footer={[

               ]}
             >
               <Form layout="vertical" onSubmit={this.handleSubmit}>
                 <FormItem {...formItemLayout} label="业务类型">
                   {getFieldDecorator('yewu',{
                     initialValue: '',
                   })(
                     <Select style={{ width: '100%' }}>
                       <Option value="">请选择合同类型</Option>
                       <Option value="1">囿创客</Option>
                     </Select>
                   )}
                 </FormItem>
                 <FormItem {...formItemLayout} label="一线城市" className = "" >
                    {getFieldDecorator('radio-group',{
                      initialValue: '1',
                    })(
                      <RadioGroup>
                        <Radio value="0">是</Radio>
                        <Radio value="1">否</Radio>
                      </RadioGroup>
                    )}
                 </FormItem>

                 <FormItem {...formItemLayout} label="城市代理" className = "" >
                    {getFieldDecorator('cityAgency',{
                      initialValue: '0',
                    })(
                      <RadioGroup>
                        <Radio value="0">是</Radio>
                        <Radio value="1">否</Radio>
                      </RadioGroup>
                    )}
                 </FormItem>

                 <FormItem {...formItemLayout} label="模板名称">
                     <Input defaultValue="囿创客_一线城市_"/>
                 </FormItem>

                 <FormItem {...formItemLayout} label="模板名称">
                     <Input defaultValue="v1.0"/>
                 </FormItem>

                 <FormItem
                    {...formItemLayout}
                    label="上传模板"
                  >
                    {getFieldDecorator('upload', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload name="logo" listType="picture">
                        <Button>
                          <Icon type="upload" /> 上传文件
                        </Button>
                      </Upload>
                    )}
                 </FormItem>
                 <FormItem {...formItemLayout} label="状态" className = "" >
                    {getFieldDecorator('status',{
                      initialValue: '0',
                    })(
                      <RadioGroup>
                        <Radio value="0">有效</Radio>
                        <Radio value="1">无效</Radio>
                      </RadioGroup>
                    )}
                 </FormItem>

                 <Row>
                  <Col span={14} offset={10}>
                    <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={ () => this.handleOk() }>提交</Button>
                  </Col>
                 </Row>
               </Form>
             </Modal>
           </div>
           <Table columns={columns} dataSource={data} />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
