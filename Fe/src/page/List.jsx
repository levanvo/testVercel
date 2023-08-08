import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { All_Categories, Create_Categories, One_Categories, Remove_Categories, Update_Categories } from '../api/api_categories';
import { Table, message, Form, Input } from 'antd';
import { Remove_Posts } from '../api/api_posts';
import DashBoard from './DashBoard';

const List = () => {
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const dispatch = useDispatch();
  const [idTemps, setTemps] = useState("");
  const { dataCategories } = useSelector((item) => item.dataCategory);
  const [getDataUpdate, setDataUpdate] = useState({})

  useEffect(() => {
    const fetchAPI_CT = async () => {
      const { data } = await All_Categories();
      dispatch({ type: "API_Category", payload: data });
    };
    fetchAPI_CT();
  }, []);
  // handle others
  const getIdList = async (idList) => {
    const { data } = await One_Categories(idList);
    setDataUpdate(data);
  }
  const SetLoadNewListUpdate = () => {
    return <DashBoard />
  }
  // CRUD list
  const AddList = async (data) => {
    dispatch({ type: "add_Category", payload: data });
    const info = () => {
      message.success('Added list: ' + data.nameList);
    };
    info();
    await Create_Categories(data);
    formAdd.resetFields();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  const RemoveList = async (data) => {
    const wordering = window.confirm("Are you sure ?");
    if (wordering) {
      if (data.arrayPosts.length > 0) {
        const decide = window.confirm("The category has associated products, still delete ?");
        if (decide) {
          data.arrayPosts?.map((item) => {
            Remove_Posts(item);
            dispatch({ type: "remove_Post", payload: item });
          });
          Remove_Categories(data._id);
          dispatch({ type: "remove_Category", payload: data._id });
          const info = () => {
            message.success('Deleted list + something products has linked this list !');
          };
          info();
        };
      } else {
        Remove_Categories(data._id);
        dispatch({ type: "remove_Category", payload: data._id });
        message.success('Deleted list !');
      };
    };
  };
  const UpdateList = async (data) => {
    await Update_Categories(data, idTemps);
    dispatch({ type: "update_Category", payload: { ...data, idTemps } });
    const info = () => {
      message.success('Updateted: ' + data.nameList);
    };
    info();
    formUpdate.resetFields();
    setTemps("");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  const columns = [
    {
      title: <p className='text-center '>#</p>,
      dataIndex: 'Uid',
      key: 'Uid',
      render: (text, key) => (<p className='text-center' key={key._id}>{text + 1}</p>),
    },
    {
      title: <p className='text-center '>Name</p>,
      dataIndex: 'nameList',
      key: 'nameList',
      render: (text, key) => (<p className='text-center' key={key._id}>{text}</p>),
    },
    {
      title: <p className='text-center '>Linked-Products</p>,
      key: "Linked-Products",
      render: (text, key) => {
        return <p className='text-center' key={key._id}>{key.arrayPosts?.length}</p>
      },
    },
    {
      title: <p className='text-center '>Handle</p>,
      key: 'action',
      render: (data, record) => (
        <div className='flex justify-center space-x-2'>
          <button onClick={() => RemoveList(data)} className='bg-red-500 p-1 rounded-md text-white font-bold hover:scale-110'>Remove</button>
          <input type="checkbox" id={data._id} className='formUpdateCT' hidden />
          <label htmlFor={data._id}><p onClick={() => getIdList(data._id)} className='bg-green-500 p-1 rounded-md text-white font-bold hover:scale-110 cursor-pointer'>Update</p></label>
          <div className="formCT rounded-md duration-200">
            <h2 className='text-center dfont-bold text-xl mb-7 mt-2'>Update-list: <span className='text-orange-500'>"{data.nameList}"</span></h2>
            <Form
              initialValues={getDataUpdate}
              name="basic"
              form={formUpdate}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={UpdateList}
            >
              <Form.Item
                label={`name-List`}
                name={`nameList`}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input maxLength={16} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                <button onClick={() => setTemps(data._id)} className='bg-sky-600 text-white hover:bg-sky-500 px-7 mt-5 py-1 rounded-md'>
                  Update
                </button>
              </Form.Item>
            </Form>
            {/* :""} */}
          </div>
          <label htmlFor={data._id} className='display2' onClick={() => SetLoadNewListUpdate()}></label>
        </div>
      ),
    },
  ];

  const data = dataCategories?.map((item, index) => {
    return {
      key: item._id,
      Uid: index,
      ...item,
    }
  })
  return (
    <div className=''>
      <p className='rounded-b-md px-56 py-1 bg-gray-700 w-fit mx-auto text-gray-300 font-bold'>Control-Lists</p>
      <input type="checkbox" id='addList' hidden />
      <div className="flex justify-end text-green-600 hover:text-orange-500"><label htmlFor="addList"><p className=' cursor-pointer'>Add-list</p></label></div>
      <div className="formAddList rounded-md duration-200">
        <h2 className='text-center dfont-bold text-xl mt-2 mb-7'>Add-list</h2>
        <Form
          name="basic"
          form={formAdd}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={AddList}
          autoComplete="on"
        >
          <Form.Item
            label="name-List"
            name="nameList"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input maxLength={16} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <button className='bg-sky-600 text-white hover:bg-sky-500 px-7 mt-5 py-1 rounded-md'>
              Add
            </button>
          </Form.Item>
        </Form>
      </div>
      <label htmlFor="addList" className='display rounded-xl'></label>
      <div className="w-[810px] mt-1 h-[550px] text-red-500 ">
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
      </div>
    </div>
  )
}

export default List
