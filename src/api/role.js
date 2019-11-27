// import axios from '../axios'
import axios from '@/utils/axios'
/*
 * 角色管理模块
 */
// 全部角色
export const allRoles = (params) => {
        if (!params.name) {
            delete params.name
        }
        return axios({
            url: '/v1/roles/',
            method: 'get',
            params
        })
    }
    // 新增
export const add = (data) => {
    return axios({
        url: `/user/Test/test/`,
        method: 'post',
        data
    });

};

// 编辑
export const edit = (data) => {
    return axios({
        url: `/v1/roles/${data.id}`,
        method: 'put',
        data
    });
};

export const findTree = () => {
    return axios({
        method: 'get',
        url: '/v1/resources/',
    })
}

// 删除
export const dele = (id) => {
        return axios({
            url: `/v1/roles/${id}`,
            method: 'delete'
        })
    }
    // 已选角色
export const checkRole = (roleCode) => {
    return axios({
        url: `/v1/roles/${roleCode}/resources/`,
        method: 'get'
    })
}

// 授权
export const getRole = (code, data) => {
    return axios({
        url: `/v1/roles/${code}/resources/`,
        method: 'post',
        data
    })
}
