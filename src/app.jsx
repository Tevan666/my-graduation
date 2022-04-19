import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser, currentUserInfo } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import logo from './assets/logo.png';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const msg = await currentUserInfo(token);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    logo: logo,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    //水印
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          // eslint-disable-next-line react/jsx-key
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          // eslint-disable-next-line react/jsx-key
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

// const authHeaderInterceptor = async (url, options) => {
//   const token = localStorage.getItem('token');
//   const msg = await currentUserInfo(token);
//   const authHeader = { userId: msg.userId };
//   return {
//     url: `${url}`,
//     options: { ...options, interceptors: true, headers: authHeader },
//   };
// };

// export const request = {
//   // 新增自动添加AccessToken的请求前拦截器
//   requestInterceptors: [authHeaderInterceptor],
// };
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '没有操作权限。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (response.status == 403) {
      notification.error({
        message: errorText,
      });
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
  }
  if (!response) {
    if (error.name === 'AbortError') {
      // notification.error({
      //   description: '用户主动放弃了请求数据',
      //   message: '取消请求',
      // });
    } else {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
  }
  throw error;
};
const demoResponseInterceptors = (response, options) => {
  return response;
};

export const request = {
  // errorHandler,
  errorConfig: {
    adaptor: (resData, options) => {
      const errorText = codeMessage[resData.status] || resData.statusText;

      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message || errorText,
      };
    },
  },
  middlewares: [
    async function middlewareA(ctx, next) {
      await next();
    },
  ],
  requestInterceptors: [
    (url, options) => {
      const userId = localStorage.getItem('userId');
      const inoptions = {
        ...options,
        headers: { ...options.headers, Authorization: '' },
      };
      if (!userId) {
        console.log(1111);
      } else {
        inoptions.headers.userId = `${userId}`;
      }
      // inoptions.headers.uid = 123456789;
      // inoptions.headers.username = 'cloudtogo1';
      // inoptions.headers.tenantId = 987654321;
      // inoptions.headers.tenantName = 'cloudtogo2';

      return {
        options: inoptions,
      };
    },
  ],
  // responseInterceptors: [demoResponseInterceptors],
  // signal: CustomAbortController.signal
};
