import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { All_Posts, Create_Posts, Remove_Posts, Update_Posts } from '../api/api_posts';
import { Table, Image, Form, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from "axios";

const Posts = () => {
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const dispatch = useDispatch();
  const { dataPosts } = useSelector((item) => item.dataPost);
  const { dataCategories } = useSelector((item) => item.dataCategory);
  const [useImage1, setImage1] = useState('');
  const [useSelect1, setSelect1] = useState('');
  const [useImage2, setImage2] = useState('https://picsum.photos/300');//khu vuc khong lay dc img tu hang 2 tro di khi update !
  const [useSelect2, setSelect2] = useState('');
  const [useId, setId] = useState("");
  const [useOptions, setOptions] = useState([]);

  useEffect(() => {
    const fetchAPI_P = async () => {
      const { data } = await All_Posts();
      dispatch({ type: "API_Category", payload: data });
    };
    fetchAPI_P();
    // áp dụng useState lấy data từ thẻ Select
    const showCategories = dataCategories.map((item) => ({
      label: item.nameList,
      value: item._id,
    }))
    setOptions(showCategories);
  }, []);

  // khu upload image choosed và selected
  const handleImage = async () => {
    const getImage = document.querySelector("#uploadImage");
    const localImage = document.getElementById("placeReceiveImage");
    const Image = getImage.files[0];
    if (getImage.value) {
      localImage.src = URL.createObjectURL(Image);
    }
    // console.log(Image);
    const cloudName = "darnprw0q";
    const presetName = "vole_2k";
    const folderName = "assigment_TypeScript";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const upImage = new FormData();

    upImage.append("upload_preset", presetName);
    upImage.append("folder", folderName);
    upImage.append("file", Image);
    const get_image = await axios.post(api, upImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setImage1(get_image.data.secure_url);
  };
  const handleImageUpdate = async () => {//khu vuc khong lay dc img tu hang 2 tro di khi update !
    const getImage = document.querySelector("#uploadImageUpdate");
    const localImage = document.getElementById("placeReceiveImageUpdate");
    const Image = getImage.files[0];
    console.log(getImage);

    if (getImage.value) {
      localImage.src = URL.createObjectURL(Image);
    }
    // console.log(Image);
    const cloudName = "darnprw0q";
    const presetName = "vole_2k";
    const folderName = "assigment_TypeScript";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const upImage = new FormData();

    upImage.append("upload_preset", presetName);
    upImage.append("folder", folderName);
    upImage.append("file", Image);
    const get_image = await axios.post(api, upImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setImage2(get_image.data.secure_url);
  };
  const ResetImage = () => {
    const getImage = document.querySelector("#uploadImage");
    const localImage = document.getElementById("placeReceiveImage");
    localImage.src = "";//làm trống ảnh xem trước
    setImage1("");// làm trống ảnh tải về
    if (getImage.value) {
      const info = () => {
        message.success('Remove the image .');
      };
      info();
    }
    getImage.value = "";
  };
  const ResetImageUpdate = () => {//khu vuc khong lay dc img tu hang 2 tro di khi update !
    const getImage = document.querySelector("#uploadImageUpdate");
    const localImage = document.getElementById("placeReceiveImageUpdate");
    localImage.src = "";//làm trống ảnh xem trước
    setImage2("");// làm trống ảnh tải về
    if (getImage.value) {
      const info = () => {
        message.success('Remove the image .');
      };
      info();
    }
    getImage.value = "";
  };
  const SetIdPost = (idPost) => {
    setId(idPost);
  };
  const handleChangeSelect = (value) => {
    setSelect1(value);//cập nhật _id của list đã chọn
  };
  const handleChangeSelectUpdate = (value) => {
    setSelect2(value);//cập nhật _id của list đã chọn
  };
  // CRUD cho page Posts
  const RemovePost = async (id) => {
    const conside = window.confirm("remove it !,are you sure ?");
    if (conside) {
      await Remove_Posts(id);
      dispatch({ type: "remove_Post", payload: id });
      const info = () => {
        message.success('Deleted this post !');
      };
      info();
    };
  };
  const UpdatePost = async (data) => {
    const datta = {
      title_post: data.title_post,
      content: data.content,
      image: useImage2,//li do
      link: data.link,
      categoryID: useSelect2,
      conclusion: data.conclusion,
      reference_source: data.reference_source,
      synopsis: data.synopsis,
      poster: data.poster,
    };
    console.log(datta);

    await Update_Posts(datta, useId);
    dispatch({ type: "update_Post", payload: { ...datta, useId } });
    formUpdate.resetFields();
    const info = () => {
      message.success('Updated a post: ' + data.title_post);
    };
    info();
    ResetImageUpdate();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  const AddPost = async (data) => {
    const datta = {
      title_post: data.title_post,
      content: data.content,
      image: useImage1,
      link: data.link,
      categoryID: useSelect1,
      conclusion: data.conclusion,
      reference_source: data.reference_source,
      synopsis: data.synopsis,
      poster: data.poster,
    };
    await Create_Posts(datta);
    dispatch({ type: "add_Post", payload: datta });
    formAdd.resetFields();
    const info = () => {
      message.success('Added a post: ' + data.title_post);
    };
    info();
    ResetImage();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  // ========= info show Table Posts
  const columns = [

    {
      title: <p className='text-center'>#</p>,
      dataIndex: 'Uid',
      key: 'Uid',
      render: (key) => (<p className='text-center'>{key + 1}</p>)
    },
    {
      title: <p className='text-center'>Title</p>,
      dataIndex: "title_post",
      key: 'title_post',
      render: (text) => <p className='text-center'>{text}</p>,
    },
    {
      title: <p className='text-center'>Content</p>,
      dataIndex: 'content',
      key: 'content',
      render: (text) => text.length > 200 ? <p className='text-center mx-auto w-96 h-52 ScrollWeb'>{text}</p> : <p className='text-center w-96 mx-auto h-auto '>{text}</p>,
    },
    {
      title: <p className='text-center'>Image</p>,
      dataIndex: 'image',
      key: 'image',
      render: (text) => <div className="w-24 h-auto mx-auto"><Image className='rounded-xl' src={text}></Image></div>,
    },
    {
      title: <p className='text-center'>Link</p>,
      dataIndex: 'link',
      key: 'link',
      render: (text) => <p className='text-center'>{text}</p>,
    },
    {
      title: <p className='text-center'>name-List</p>,
      dataIndex: 'categoryID',
      key: 'categoryID',
      render: (record) => {
        return <p className='text-center'>{record}</p>
      }
    },
    {
      title: <p className='text-center'>Conclusion</p>,
      dataIndex: 'conclusion',
      key: 'conclusion',
      render: (text) => <p className='text-center w-52 mx-auto'>{text}</p>,
    },
    {
      title: <p className='text-center'>Reference_source</p>,
      dataIndex: 'reference_source',
      key: 'reference_source',
      render: (text) => <p className='text-center'>{text}</p>,
    },
    {
      title: <p className='text-center'>Synopsis</p>,
      dataIndex: 'synopsis',
      key: 'synopsis',
      render: (text) => <p className='text-center w-52 mx-auto'>{text}</p>,
    },
    {
      title: <p className='text-center'>Poster</p>,
      dataIndex: 'poster',
      key: 'poster',
      render: (text) => <p className='text-center'>{text}</p>,
    },
    {
      title: <p className='text-center'>Handle</p>,
      key: 'action',
      render: (data, record) => (
        <div className='flex justify-center space-x-2'>
          <button onClick={() => RemovePost(data?._id)} className='bg-red-500 py-1 px-2 rounded-md text-white font-bold hover:scale-110'>Remove</button>
          <input type="checkbox" id={data._id} className='inputPost' hidden />
          <label htmlFor={data._id} onClick={() => SetIdPost(data?._id)} className='cursor-pointer bg-green-500 py-1 px-2 rounded-md text-white font-bold hover:scale-110'>Update</label>
          <div className="formUpdatePost rounded-lg duration-200">
            <h2 className='text-center xfont-bold text-xl'>Update Post: <span className='text-orange-500'>{data.title_post}</span></h2>
            <Form
              name="basic"
              form={formUpdate}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 750 }}
              onFinish={UpdatePost}
              autoComplete="on">

              <div className="flex mt-5">
                <div className="w-[380px]">
                  <Form.Item
                    label="Title"
                    name="title_post"
                    rules={[{ required: true, message: 'Please input your title !' }]}
                  >
                    <Input maxLength={16} />
                  </Form.Item>

                  <Form.Item
                    label="Link "
                    name="link"
                    rules={[{ required: true, message: 'Please input your link !' }]}
                  >
                    <Input maxLength={25} />
                  </Form.Item>
                  <Form.Item
                    label="List "
                    name="CategoryID"
                    rules={[{ required: true, message: 'List for your post !' }]}
                  >
                    <Select
                      defaultValue="Chosse list ?"
                      style={{ width: 222 }}
                      onChange={handleChangeSelectUpdate}
                      options={[
                        {
                          label: 'List-posts',
                          options: useOptions,
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Conclusion"
                    name="conclusion"
                    rules={[{ required: true, message: 'Please input your conclusion!' }]}
                  >
                    <Input maxLength={80} />
                  </Form.Item>
                  <Form.Item
                    label="Source"
                    name="reference_source"
                    rules={[{ required: true, message: 'Please input your source!' }]}
                  >
                    <Input maxLength={20} />
                  </Form.Item>
                  <Form.Item
                    label="Poster"
                    name="poster"
                    rules={[{ required: true, message: 'Who is poster !' }]}
                  >
                    <Input maxLength={16} />
                  </Form.Item>
                </div>
                <div className="w-[470px]">
                  <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Choose a photo for your post !' }]}
                  >
                    <div className="mb-5 formUpImage">
                      <div className="flex justify-center space-x-5 mb-2">
                        {/* <p><span className='text-red-500'>*</span> Image:</p> */}
                        <p className='bg-red-500 text-white rounded-xl leading-5 w-20 text-center cursor-pointer active:scale-90' onClick={() => ResetImageUpdate()}>reset</p>
                      </div>

                      <div className="inputImage flex justify-center space-x-2">
                        <input type="file" id='uploadImageUpdate' onChange={handleImageUpdate} className='rounded-md w-36 cursor-pointer' />
                        <img className='rounded-md border w-40 h-28 cursor-no-drop' src="" alt="" id='placeReceiveImageUpdate' />
                      </div>
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="Synopsis"
                    name="synopsis"
                    rules={[{ required: true, message: 'a short summary description !' }]}
                  >
                    <TextArea maxLength={80} />
                  </Form.Item>
                  <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input your content !' }]}
                  >
                    <TextArea className='' />
                  </Form.Item>
                </div>
              </div>
              {/* button */}
              <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                <button className='bg-sky-600 text-white hover:bg-sky-500 px-7 mt-5 py-1 rounded-md'>
                  Update post
                </button>
              </Form.Item>
            </Form>
          </div>
          <label htmlFor={data._id} className='displayUpdatePost'></label>
        </div>
      ),
    },
  ];

  const dataPost = dataPosts?.map((item, index) => {
    return {
      key: item._id,
      Uid: index,
      ...item
    };
  });

  return (
    <div className=''>
      <p className='text-gray-300 font-bold bg-gray-700 rounded-b-md px-56 py-1 w-fit mx-auto'>Control-Posts</p>
      <input type="checkbox" id='addPost' hidden />
      <div className="flex justify-end  text-green-600 hover:text-orange-500"><label htmlFor="addPost"><p className=' cursor-pointer'>Add-new</p></label></div>
      <div className="formAddPost rounded-md duration-200">
        <h2 className='text-center xfont-bold text-xl'>Add-new Post</h2>
        <Form
          name="basic"
          form={formAdd}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 750 }}
          onFinish={AddPost}
          autoComplete="on">

          <div className="flex mt-5">
            <div className="w-[380px]">
              <Form.Item
                label="Title"
                name="title_post"
                rules={[{ required: true, message: 'Please input your title !' }]}
              >
                <Input maxLength={16} className='' />
              </Form.Item>

              <Form.Item
                label="Link "
                name="link"
                rules={[{ required: true, message: 'Please input your link !' }]}
              >
                <Input maxLength={25} />
              </Form.Item>
              <Form.Item
                label="Select a list"
                name="selectedList"
                rules={[{ required: true, message: 'Please select a list!' }]}
              >
                <Select
                  defaultValue="Chosse list ?"
                  style={{ width: 222 }}
                  onChange={handleChangeSelect}
                  options={[
                    {
                      label: 'List-posts',
                      options: useOptions,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Conclusion"
                name="conclusion"
                rules={[{ required: true, message: 'Please input your conclusion!' }]}
              >
                <Input maxLength={30} />
              </Form.Item>
              <Form.Item
                label="Source"
                name="reference_source"
                rules={[{ required: true, message: 'Please input your source!' }]}
              >
                <Input maxLength={20} />
              </Form.Item>
              <Form.Item
                label="Poster"
                name="poster"
                rules={[{ required: true, message: 'Who is poster !' }]}
              >
                <Input maxLength={16} />
              </Form.Item>
            </div>
            <div className="w-[470px]">
              <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Choose a photo for your post !' }]}
              >
                <div className="mb-5 formUpImage">
                  <div className="flex justify-center space-x-5 mb-2">
                    {/* <p><span className='text-red-500'>*</span> Image:</p> */}
                    <p className='bg-red-500 text-white rounded-xl leading-5 w-20 text-center cursor-pointer active:scale-90' onClick={() => ResetImage()}>reset</p>
                  </div>

                  <div className="inputImage flex justify-center space-x-2">
                    <input type="file" id='uploadImage' onChange={handleImage} className='rounded-md w-36 cursor-pointer' />
                    <img className='rounded-md border w-40 h-28 cursor-no-drop' src="" alt="" id='placeReceiveImage' />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                label="Synopsis"
                name="synopsis"
                rules={[{ required: true, message: 'a short summary description !' }]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please input your content !' }]}
              >
                <TextArea className='' />
              </Form.Item>
            </div>
          </div>
          {/* button */}
          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <button className='bg-sky-600 text-white hover:bg-sky-500 px-7 mt-5 py-1 rounded-md'>
              Add post
            </button>
          </Form.Item>
        </Form>
      </div>
      <label htmlFor="addPost" className='displayPost rounded-xl'></label>

      <div className="Scroll w-[810px] mt-5 h-[540px] ">
        <div className=" overflow-hidden w-[2400px]">
          <Table columns={columns} dataSource={dataPost} pagination={{ pageSize: 3 }} />
        </div>

      </div>
    </div>
  )
}

export default Posts
