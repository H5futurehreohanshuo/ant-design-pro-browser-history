import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
        component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
      },
      {
        name: '测试的页面',
        path: 'test-page',
        component: dynamicWrapper(app, [], () => import('../routes/Test/Page1')),
      },
      {
        name: '网签',
        path: 'Net',
        children:[
           {
               name: '我的网签',
               path: 'MyNet',
               component: dynamicWrapper(app, [], () => import('../routes/Net/MyNet')),
           },
           {
               name: '发起签约',
               path: 'SignContract',
               component: dynamicWrapper(app,[], () => import('../routes/Net/MyNet/SignContract')),
           },
           {
               name: '协议签署',
               path: 'SignEsign',
               component: dynamicWrapper(app,[], () => import('../routes/Net/MyNet/SignEsign')),
           },
           {
               name: '协议查看',
               path: 'SignExamine',
               component: dynamicWrapper(app,[], () => import('../routes/Net/MyNet/SignExamine')),
           },
           {
               name: '协议查询',
               path: 'DealQuery',
               component: dynamicWrapper(app, [], () => import('../routes/Net/DealQuery')),
           },
           {
               name: '协议模板',
               path: 'DealStencil',
               component: dynamicWrapper(app, [], () => import('../routes/Net/DealStencil')),
           },
           {
               name: '签署管理',
               path: 'SignAdmin',
               component: dynamicWrapper(app, [], () => import('../routes/Net/SignAdmin')),
           },
        ]
      }
    ],
  },
];
