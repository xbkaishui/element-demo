import axios from 'axios'

let base = 'http://127.0.0.1:8010/api'


//model的增删改查
export const getModels = params => { return axios.get(`${base}/models`, { params: params }); };

export const removeModel= params => {
    let id = params['id'];
	console.log(id);
    return axios.delete(`${base}/models/${id}`, { params: params }); };

export const editModel= params => {
    console.log(params);
    let id = params['id'];
    return axios.put(`${base}/models/${id}`,  params); };

export const addModel= params => { return axios.post(`${base}/models`,  params ); };
//rule 的增删改查
export const  getRules =  params =>{
	return axios.get(`${base}/rules`,{params:params});
	};
export const searchRuleByRuleID = params=>{
	let RuleID = params['RuleID'];	console.log(RuleID);	return axios.get(`${base}/rules`,{params:params} );
};
	
export const editRule=params=>{
	let id = params['id'];
	console.log(id);
	return axios.put(`${base}/rules/${id}`,params);
	};
	
export const addRule=params=>{
	//let id = params['RuleID'];
	return axios.post(`${base}/rules`,params);
	
};

export const deleteRule=params=>{
	let id = params['id'];
	console.log(id);
	return axios.delete(`${base}/rules/${id}`,{params:params});
};