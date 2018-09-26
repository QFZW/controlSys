import request from '@/utils/request'
export function listMasker () {
  return request({
    url: '/api/propertyManager/listMasker',
    method: 'post',
    data: {
    }
  })
}
export function listDeviceRepaireStatistic (startDate,endDate) {
    return request({
      url: '/api/propertyManager/listDeviceRepairStatistic',
      method: 'post',
      data: {
        startDate,
        endDate
      }
    })
  }

export function listDeviceDamageCountByMonth (startDate,endDate) {
    return request({
      url: '/api/propertyManager/listDeviceDamageCountByMonth',
      method: 'post',
      data: {
        startDate,
        endDate
      }
    })
  }


  //   联系人添加

  export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
  }

  export function addOrUpdateMasker (maskName,sex,age,phoneNumber,email,place,nnlightctlMaskerId,codeNumber,department){
    return request({
      url:'/api/propertyManager/addOrUpdateMasker',
      method:'post',
      data:{
        maskName,sex,age,phoneNumber,email,place,nnlightctlMaskerId,codeNumber,department
      }
    })
  }


  //   通过ID获取联系人

  export function getMasker(id){
    return request({
      url:'/api/propertyManager/getMasker',
      method:'post',
      data:{
        id
      }
    })
  }

  //   编辑联系人

  export function ConOrUpdateMasker (id,maskName,sex,age,phoneNumber,email,place,nnlightctlMaskerId,codeNumber,department){
    return request({
      url:'/api/propertyManager/addOrUpdateMasker',
      method:'post',
      data:{
       id,maskName,sex,age,phoneNumber,email,place,nnlightctlMaskerId,codeNumber,department
      }
    })
  }

  //  单个删除

  export function deleteMasker(maskerIds){
    return request({
      url:'/api/propertyManager/deleteMasker',
      method:'post',
      data:{
        maskerIds 
      }
    })
  }


  //   维修管理 获取 提交未提交 

  export function listRepairRecord(isCommit){
    return request({
      url:'/api/propertyManager/listRepairRecord',
      method:'post',
      data:{
        isCommit
      }
    })
  }

  //   新增

  export function addOrUpdateRepairRecord(id,nnlightctlEleboxId,nnlightctlPropertyClassifyCatalogId,propertyName,propertyCount,faultDate,createDate,nnlightctlUserId,isCommit){
    return request({
      url:'/api/propertyManager/addOrUpdateRepairRecord',
      method:'post',
      data:{
        id,nnlightctlEleboxId,nnlightctlPropertyClassifyCatalogId,propertyName,propertyCount,faultDate,createDate,nnlightctlUserId,isCommit
      }
    })
  }

  //   删除

  export function deleteRepairRecord(repairRecordIds){
    return request({
      url:'/api/propertyManager/deleteRepairRecord',
      method:'post',
      data:{
        repairRecordIds 
      }
    })
  }

  //  提交

  export function commitRepairRecord(repairRecordIds){
    return request({
      url:'/api/propertyManager/commitRepairRecord',
      method:'post',
      data:{
        repairRecordIds 
      }
    })
  }

  // 仓库 管理


  export function addOrUpdateRepertory(uid,repertoryName,repertoryAddress,repertoryPhone,repertoryZipCode,nnlightctlUserId){
    return request({
      url:'/api/propertyManager/addOrUpdateRepertory',
      method:'post',
      data:{
        uid,repertoryName,repertoryAddress,repertoryPhone,repertoryZipCode,nnlightctlUserId
      }
    })
  }

  //   仓库获取


  export function listRepertory(){
    return request({
      url:'/api/propertyManager/listRepertory',
      method:'post',
      data:{
        
      }
    })
  }

  //  删除

  
  export function deleteRepertory(repertoryIds){
    return request({
      url:'/api/propertyManager/deleteRepertory',
      method:'post',
      data:{
        repertoryIds 
      }
    })
  }

  //  编辑 仓库

  export function conOrUpdateRepertory(id,uid,repertoryName,repertoryAddress,repertoryPhone,repertoryZipCode,nnlightctlUserId){
    return request({
      url:'/api/propertyManager/addOrUpdateRepertory',
      method:'post',
      data:{
       id,uid,repertoryName,repertoryAddress,repertoryPhone,repertoryZipCode,nnlightctlUserId
      }
    })
  }

  //   通过ID 获取  仓库


  export function getRepertory(id){
    return request({
      url:'/api/propertyManager/getRepertory',
      method:'post',
      data:{
        id
      }
    })
  }

  //   变更记录


  export function listPropertyTransRecord(){
    return request({
      url:'/api/propertyManager/listPropertyTransRecord',
      method:'post',
      data:{

      }
    })
  }



  // 时间处理



  export function changeTime(time){
    var newTime =new Date(time);
    var iH = newTime.getFullYear();
    var iM = newTime.getMonth()+1;
    var iS = newTime.getDate();
    return iH+'-'+iM+'-'+iS;
}


//  统计入库申请

export function countApplyInRepertory(){
  return request({
    url:'/api/propertyManager/countApplyInRepertory',
    method:'post',
    data:{

    }
  })
}


export function countApplyOutRepertory(){
  return request({
    url:'/api/propertyManager/countApplyOutRepertory',
    method:'post',
    data:{

    }
  })
}


//   出入库 数据

export function listApplyInRepertory(){
  return request({
    url:'/api/propertyManager/listApplyInRepertory',
    method:'post',
    data:{

    }
  })
}


export function listApplyOutRepertory(){
  return request({
    url:'/api/propertyManager/listApplyOutRepertory',
    method:'post',
    data:{
      
    }
  })
}




//   历史工单  
export function listWorkOrderHistory(){
  return request({
    url:'/api/workOrder/listWorkOrderHistory',
    method:'post',
    data:{

    }
  })
}



//   我的工单 


export function countWorkOrderState(){
  return request({
    url:'/api/workOrder/countWorkOrderState',
    method:'post',
    data:{

    }
  })
}


//  工单获取
export function listWorkOrder(state){
  return request({
    url:'/api/workOrder/listWorkOrder',
    method:'post',
    data:{
      state
    }
  })
}
export function listWorkOrderA(){
  return request({
    url:'/api/workOrder/listWorkOrder',
    method:'post',
    data:{
      
    }
  })
}

//   新增工单 

export function addWordOrder(id,serialNumber,classify,nnlightctlWorkflowerId,priority,nnlightctlRegionId,address,nnlightctlMaskerId,content,attachFilePath){
  return request({
    url:'/api/workOrder/addWordOrder',
    method:'post',
    data:{
      id,serialNumber,classify,nnlightctlWorkflowerId,priority,nnlightctlRegionId,address,nnlightctlMaskerId,content,attachFilePath
    }
  })
}



//   维修管理 编辑

export function getRepairRecord(id){
  return request({
    url:'/api/propertyManager/getRepairRecord',
    method:'post',
    data:{
      id
    }
  })
}



//   资产审批 

export function listApplyInApprovePending(){
  return request({
    url:'/api/propertyManager/listApplyInApprovePending',
    method:'post',
    data:{

    }
})
}

export function listApplyInHistory(){
  return request({
    url:'/api/propertyManager/listApplyInHistory',
    method:'post',
    data:{

    }
})
}


export function configAutoCommitRepairRecord(repairRecordIds,commitDate){
  return request({
    url:'/api/propertyManager/configAutoCommitRepairRecord',
    method:'post',
    data:{
      repairRecordIds,commitDate
    }
  })
}



