export const arrayToJson = function(treeArray, type, pId) {
    let r = [];
    let tmpMap = {};

    function sortId(a, b) {
        return a.priority - b.priority
    }
    let sortArr = function(arr) {
        arr = arr.sort(sortId);
        arr.forEach(el => {
            if (el.children && el.children.length) {
                sortArr(el.children);
            }
        });
        return arr;
    };
    // 过滤类型
    if (!type) {
        treeArray = treeArray.filter(el => {
            return el.type === 0;
        });
    } else {
        if (type === 2) {
            treeArray = treeArray.filter(el => {
                return el.type !== 1;
            });
        }
    }
    treeArray.forEach((el, i) => {
        tmpMap[el['id']] = el;
    });
    treeArray.forEach((el, i) => {
        let parent = pId || 'parentId'
        let key = tmpMap[el[parent]];
        //循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
        if (key) {
            if (!key['children']) {
                key['children'] = [];
                key['children'].push(el);
            } else {
                key['children'].push(el);

            }
            // el.url && (el.url = el.url.replace(/\//gm, ''));
        } else {
            //如果没有这个Key值，那就代表没有父级,直接放在最外层
            r.push(el);
        }
    });
    r = sortArr(r);
    return r;
};

// export const treeMenu = function(data, parent) {
//     data = data.sort().filter(el => {
//         return el.type === 0;
//     });
//     let tree = [];
//     let temp;
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].parent == parent) {
//             var obj = data[i];
//             temp = treeMenu(data, data[i].id);
//             if (temp.length > 0) {
//                 obj.children = temp;
//             }
//             tree.push(obj);
//         }
//     }
//     return tree;
// }

// export const treeAll = function(data, parent) {
//     data = data.sort();
//     let tree = [];
//     let temp;
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].parent == parent) {
//             var obj = data[i];
//             temp = treeAll(data, data[i].id);
//             if (temp.length > 0) {
//                 obj.children = temp;
//             }
//             tree.push(obj);
//         }
//     }
//     return tree;
// }
export const findParent = (treeData, key) => {
    let arr = []; // 在递归时操作的数组
    let returnArr = []; // 存放结果的数组
    let depth = 0; // 定义全局层级
    // 定义递归函数
    function childrenEach(childrenData, depthN) {
        for (var j = 0; j < childrenData.length; j++) {

            depth = depthN; // 将执行的层级赋值 到 全局层级

            arr[depthN] = (childrenData[j].id);

            if (childrenData[j].id == key) {
                // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
                returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
                break
            } else {
                if (childrenData[j].children) {
                    depth++;
                    childrenEach(childrenData[j].children, depth);
                }
            }
        }
        return returnArr;
    }
    return childrenEach(treeData, depth);
}