import React, { Component } from 'react';
import { TagSelect } from 'ant-design-pro/lib';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import {  } from 'antd';

const TagExpand = TagSelect.Expand;

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}


export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <PageHeaderLayout title="测试页面">
        <TagSelect onChange={handleFormSubmit} expandable>
          <TagSelect.Option value="cat1">类目一</TagSelect.Option>
          <TagSelect.Option value="cat2">类目二</TagSelect.Option>
          <TagSelect.Option value="cat3">类目三</TagSelect.Option>
          <TagSelect.Option value="cat4">类目四</TagSelect.Option>
          <TagSelect.Option value="cat5">类目五</TagSelect.Option>
          <TagSelect.Option value="cat6">类目六</TagSelect.Option>
          <TagSelect.Option value="cat7">类目七</TagSelect.Option>
          <TagSelect.Option value="cat8">类目八</TagSelect.Option>
          <TagSelect.Option value="cat9">类目九</TagSelect.Option>
          <TagSelect.Option value="cat10">类目十</TagSelect.Option>
          <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
          <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
        </TagSelect>
      </PageHeaderLayout>
    );
  }
}
