import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row,Col,Card,Form,Input,Select,Button,Badge,Dropdown,Menu,Modal,message,Table,Divider,Radio,DatePicker} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Net.less';

const statusMap = ['default', 'processing', 'success', 'error'];
const FormItem = Form.Item;
const { Option } = Select;

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

const datas = [];
for (let i = 0; i < 46; i++) {
  datas.push({
    key: `${i}`,
    no: `8975${i}`,
    type: (i % 2 == 0 ) ? "偶数" : "奇数",
    title: `Long Long Ago ${i} Year`,
    name: `已方 ${i}`,
    xcode: `HKDHHSA${i}${i+2}${i+4}`,
    status: Math.floor( (i/2) ),
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
    if(i == -1){
      this.setState({
        visibleX: !!vis,
      });
    }else{
      this.setState({
        visible: !!vis,
      });
    }
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
  // select 更改
  handleChange = (value) =>{
    console.log(`Selected: ${value}`);
  }
  // 查询条件组件
  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys, totalCallNo } = this.state;
    const { data , loading } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline" >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="信用代码:">
              {getFieldDecorator('no')(
                <Input placeholder="请输入信用代码" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="企业类型:">
              {getFieldDecorator('type',{
                initialValue: '',
              })(
                <Select style={{ width: 120 }}>
                  <Option value="">全部</Option>
                  <Option value="0">投资人</Option>
                  <Option value="1">管理公司</Option>
                  <Option value="2">控股公司</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="使用状态" dropdownMatchSelectWidth>
              {getFieldDecorator('status',{
                initialValue: '',
              })(
                <Select style={{ width: 120 }}>
                  <Option key='' value="">全部</Option>
                  <Option key='1' value="1">有效</Option>
                  <Option key='2' value="2">申请中</Option>
                  <Option key='3' value="3">申请失败</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft:8,marginRight:8}} onClick={this.handleFormReset}>重置</Button>
              <Button type="primary" onClick={ ()=> this.visibleModal(-1,true)}>发起签约</Button>
            </span>
          </Col>
        </Row>
        <Modal title="申请证书："
           visible={this.state.visibleX}
           onOk={this.handleOk}
           onCancel={ () => this.visibleModal(-1,false) }
           footer={[

           ]}
          >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="企业类型">
              {getFieldDecorator('type')(
                <Select style={{ width: '100%' }}>
                  <Option value="">请选择要申请的企业类型</Option>
                  <Option value="0">管理公司</Option>
                  <Option value="1">控股公司</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="社会信用代码:">
              {getFieldDecorator('xcode')(
                <Input placeholder="请输入18位有效的统一社会信用代码"/>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="企业名称:">
              {getFieldDecorator('designation')(
                <Input placeholder="请输入营业执照企业全称" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="营业执照地址:">
              {getFieldDecorator('business')(
                <Input />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="法人姓名:">
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="法人身份证:">
              {getFieldDecorator('identity')(
                <Input />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="手机号码:" extra="预留管理员手机号码即可">
              {getFieldDecorator('phone')(
                <Input />
              )}
            </FormItem>
          </Form>
          <Row>
           <Col span={14} offset={10}>
             <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={ () => this.handleOk() }>提交申请</Button>
           </Col>
          </Row>
        </Modal>
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
  // 初始化 表格信息
  getInitialState = () => {
    const status = ["全部","有效","申请中","申请失败"];
    const columns = [
      {
        title: '证书编号',
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '企业信用代码',
        dataIndex: 'xcode',
        key: 'xcode',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text : status[0], value : 0 },
          { text : status[1], value : 1 },
          { text : status[2], value : 2 },
          { text : status[3], value : 3 }
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        }
      },
      {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        render: (i) => (
          <div>
            <Button type="primary" onClick={ ()=> this.visibleModal(i,true) }>详情</Button>
          </div>
        )
      }
    ];

    return{
      tableColumns: columns ,
      queryInfo : {    //设置最初一页显示多少条
      　　pageSize: 10
      },
      dataSource:{    //数据存放
    　　count: datas.length,    //一共几条数据
    　　data: datas,    //数据
      },
      loading: false  //Load属性设置
    }
  }
  // 改变显示条数时当前数据所在页
  toSelectchange(page,num) {
    this.setState({
      queryInfo : {
        pageSize: num
      },
      dataSource:{
        count: datas.count,
        data: datas,
      }
    });
  }
  //跳页
  gotoThispage = () => {

  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const { getFieldDecorator } = this.props.form;
    const self = this.getInitialState();
    const _this = this;
    return (
      <PageHeaderLayout title="协议查询">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.antAdvancedSearchForm}>
              {this.renderSimpleForm()}
            </div>
            <div className="search-result-list">
              <Modal title="协议详情："
                 visible={this.state.visible}
                 onOk={this.handleOk}
                 onCancel={ () => this.visibleModal(1,false) } >
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <FormItem {...formItemLayout} label="企业类型">
                    管理公司
                  </FormItem>
                </Form>
              </Modal>
              <Table
                bordered
                columns={self.tableColumns} //th菜单项
                dataSource={self.dataSource.data} //数据
                pagination={{  //分页
                    total: self.dataSource.count, //数据总数量
                    pageSize: self.queryInfo.pageSize,  //显示几条一页
                    defaultPageSize: self.queryInfo.pageSize, //默认显示几条一页
                    showSizeChanger: false,  //是否显示可以设置几条一页的选项
                    onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                    　　_this.toSelectchange(current, pageSize); //这边已经设置了self = this
                    },
                    onChange(current) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
                       _this.gotoThispage(current, self.queryInfo.pageSize);
                    },
                    showTotal: function () {  //设置显示一共几条数据
                        return '共 ' + self.dataSource.count + ' 条数据';
                    }
                }}
                loading={self.loading}  //设置loading属性
              />
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
