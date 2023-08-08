import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom"
import { All_Categories, One_Categories } from '../api/api_categories';
import { useDispatch, useSelector } from "react-redux";
import { All_Posts } from '../api/api_posts';
import { TfiPanel } from "react-icons/tfi";
import Posts from './Posts';
import DashBoard from './DashBoard';
import List from './List';
import { Empty, Image, Spin } from 'antd';

const Web = () => {
    const dispatch = useDispatch(); //dùng chung
    const { dataPosts } = useSelector((item) => item.dataPost);//get data posts
    const { dataCategories } = useSelector((item) => item.dataCategory);//get data name list
    const [getName_CT, setName_CT] = useState ('full list for today !');//get name list of your select
    const [getName_Empty, setName_Empty] = useState ('');//post empty ?
    const [Router, setRouter] = useState("dashBoard");//router
    const [getLoading, setLoading] = useState  (true);
    const [getNameList, setNameList] = useState("");
    const contentExampe = "Tùy theo từng loại và chủ đề của poster mà bạn có thể lựa chọn phần mềm thiết kế phù hợp. Với một số phần mềm thiết kế poster chuyên nghiệp, chuyên dụng có thể kể đến như: Adobe Photoshop, Adobe InDesign hay các trang web thiết kế poster như Canva. Bên cạnh đó, nếu sử dụng không quen các phần mềm của Adobe, bạn có thể thử dùng Microsoft Word, Microsoft PowerPoint hay Microsoft Publisher để thiết kế poster đơn giản hơn. Tuy nhiên, với các phần mềm chuyên về thiết kế đồ họa sẽ có nhiều ưu điểm và xử lý hình ảnh chuyên nghiệp hơn, cho bạn thỏa sức sáng tạo trong các thiết kế của mình.Ứng dụng các nguyên lý thị giác Để thiết kế một poster ấn tượng, thu hút bạn cần biết cách ứng dụng các nguyên lý thị giác. Nếu bạn muốn người xem chú ý vào khu vực nào của poster, hãy thiết kế tập trung vào đó. Việc lựa chọn một yếu tố quan trọng (màu sắc, hình ảnh, nội dung,...) để ứng dụng nguyên lý thị giác sẽ mang lại hiệu quả tốt hơn là tập trung hết vào các yếu tố.";
    // data categories and posts
    useEffect(() => {
        const fetch = async () => {
            const { data } = await All_Categories();
            dispatch({ type: "API_Category", payload: data.data });
        }
        fetch();
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        if (getLoading == true) {
            const fetch = async () => {
                const { data } = await All_Posts();
                dispatch({ type: "API_Post", payload: data.data });
            }
            fetch();
        }
    }, []);
    // handle choose list
    const All_List = async () => {
        const { data } = await All_Posts();
        dispatch({ type: "API_Post", payload: data.data });
        setName_CT("full list for today !");
        setName_Empty("");
    }
    const Choose_List = async (item) => {
        setName_CT(item.nameList);
        let arrayTemporary1 = [];
        const { data } = await All_Posts();
        dispatch({ type: "API_Post", payload: data.data });
        data.data?.map((items) => {
            if (items.categoryID == item._id) {
                arrayTemporary1.push(items);
            }
        });
        arrayTemporary1.length < 1 ? setName_Empty("No-data") : setName_Empty("");
        dispatch({ type: "API_Post", payload: arrayTemporary1 });

    };
    // Create router-Page
    const DashBoardRouter = () => {
        setRouter("dashBoard");
    }
    const ListRouter = () => {
        setRouter("list");
    }
    const PostsRouter = () => {
        All_List();
        setRouter("posts");
    }
    const DecideRouter = () => {
        if (Router == "dashBoard") {
            return <DashBoard />
        } else if (Router == "list") {
            return <List />
        } else if (Router == "posts") {
            return <Posts />
        } else {
            return <DashBoard />
        };
    };
    // get NameList
    const getItemList = async (idList) => {
        const { data } = await One_Categories(idList);
        setNameList(data?.data?.nameList)
    }
    return (
        <div className="w-[1450px] relative mx-auto bg-gray-2x00">
            {/* control panel */}
            <div className="absolute ">
                <input type="checkbox" id='manage' hidden />
                <label htmlFor="manage"><img onClick={() => ListRouter()} className='w-10 active:rotate-[45deg] duration-100 cursor-pointer' src="https://res.cloudinary.com/darnprw0q/image/upload/v1691501519/cogwheel_rzyfnc.png" alt="" /></label>
                <div className="w-[1300px] h-[700px] bg-gray-700 control rounded-xl">
                    <div className="flex text-xl m-3 text-gray-200"><p className='m-1'><TfiPanel /></p>Control Panel </div>
                    <div className="w-[1200px] mx-auto h-[620px] bg-gray-200 flex justify-center space-x-10 rounded-md">
                        <div className="w-[300px] h-[620px] relative">
                            <img className='w-14 h-14 left-[45%] top-2 border-2 border-white absolute rounded-full' src="https://res.cloudinary.com/darnprw0q/image/upload/v1686660696/test/96603192_qu8vyc.jpg" alt="" />
                            <div className="w-[300px] h-[544px] ml-5 mt-10 border border-gray-400 rounded-md">
                                <p className='text-center text-blue-500 mt-6 text-xs'>vole543215@gmail.com</p>
                                <div className="border-t border-gray-300">
                                    <p onClick={() => DashBoardRouter()} className='text-center mt-3 text-gray-500 hover:text-gray-600 text-1 cursor-pointer'>DashBoard</p>
                                    <p onClick={() => PostsRouter()} className='text-center mt-3 text-gray-500 hover:text-gray-600 text-1 cursor-pointer'>Posts</p>
                                    <p onClick={() => ListRouter()} className='text-center mt-3 text-gray-500 hover:text-gray-600 text-1 cursor-pointer'>List</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[810px] h-[620px] bg-gray-5x00 ">
                            {DecideRouter()}
                        </div>
                    </div>
                </div>
            </div>

            <div className=" w-[1300px] mx-auto h-[50px] mt-5 mb-10 ">
                <img className='sm:w-[600px] md:w-[900px] xl:w-auto' src="https://res.cloudinary.com/darnprw0q/image/upload/v1691501529/cooltext440442067129196_rcyvb4.png" alt="" />
            </div>
            {/* show data List + Posts */}
            <div className="flex space-x-2 w-[1300px] mx-auto">
                {/* list */}
                <div className="w-[25vw] mt-0 bg-gray-50 h-[600px]">
                    <p className='bg-orange-500 text-white rounded-t-md text-2xl text-center text-1'>List</p>
                    <div className="ScrollWeb h-[568px]">
                        <p onClick={() => All_List()} className=' mt-5 w-[16vw] rounded-lg py-1 duration-75 mx-auto bg-orange-400 text-white text-center active:scale-110 cursor-pointer text-2'>all-posts</p>
                        {dataCategories?.map((items) => (
                            <p onClick={() => Choose_List(items)} key={items._id} className='m-2 py-1 w-[16vw] rounded-lg duration-75 mx-auto bg-orange-400 text-white text-center active:scale-110 cursor-pointer text-2'>{items.nameList}</p>
                        ))}
                    </div>
                </div>

                {/* posts */}

                <div className="w-[70vw] mt-0 bg-gray-50 h-[600px]">
                    <p className=' text-2xl text-center text-1'>Posts</p><hr />

                    <div className="flex flex-wrap justify-center space-x-5">
                        <h3 className='text-sky-500'>* {getName_CT}</h3>
                        <form action=""></form>
                    </div>
                    <div className="flex justify-center flex-wrap mt-2 ScrollWeb h-[530px]">
                        {getLoading == true ?
                            <Spin className='my-auto' size='large' />
                            :
                            dataPosts?.map((items) => (
                                <div className="w-[270px] h-[350px] m-5 bg-gray-100 rounded-md" key={items._id}>
                                    <div className="overflow-hidden w-[240px] h-[240px] mt-2 mx-auto">
                                        <input type="checkbox" id={items._id} hidden className='inputdetail' />
                                        <label htmlFor={items._id}>
                                            <img onClick={() => getItemList(items.categoryID)} className='w-[240px] h-[240px] hover:scale-125 duration-1000 cursor-pointer rounded-md mx-auto' src={items.image} alt="" />
                                        </label>
                                        <div className="detailPost duration-100 rounded-md">
                                            <div className="flex">
                                                <div className="w-[300px] h-[250px] rounded-md">
                                                    <Image className='p-2 imageDetail' width={300} height={250} src={items.image} />
                                                </div>
                                                {/* <div className="w-[1px] h-[240px] bg-gray-300"></div> */}
                                                <div className="w-[400px] h-[250px] rounded-r-md">
                                                    <p className='text-xl text-orange-500 text-center'>{items.title_post}</p>
                                                    <div className="relative ml-2 bg-orange-300 w-[374px] text-gray-50 h-[210px] rounded-md">
                                                        <p className='h-1'></p>
                                                        <p className='px-2 bg-white w-fit text-yellow-500 float-right mr-1 rounded-md'>{getNameList ? getNameList : "error-List !"}</p>
                                                        <p className='h-5'></p>
                                                        <p className='ml-2'>{items.synopsis}</p>
                                                        <p className='ml-2 text-blue-500 w-fit hover:underline'><Link to={``}>{items.link}</Link></p>
                                                        <p className='ml-2'>{items.reference_source}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content px-2 border shadow-inner shadow-gray-100 w-[680px] mx-auto h-[220px] ScrollWeb">
                                                {/* contentExample */}
                                                <p className='font-bold'>Content: <span className='text-gray-500 font-normal'>{items.content}*{contentExampe}</span></p>
                                                <p className='font-bold'>Conclusion: <span className='text-gray-500 font-normal'>{items.conclusion}</span></p>
                                            </div>
                                            <div className="flex justify-between text-xs mt-2">
                                                <p className='text-green-600 ml-5'>{items.updatedAt}</p>
                                                <p className='text-gray-500 mr-5'>post by: <span className='text-gray-600'>{items.poster}</span></p>

                                            </div>

                                        </div>
                                        <label htmlFor={items._id} className='inputdetail displayDetails'></label>
                                    </div>
                                    <h4 className='text-gray-500 ml-2 font-medium'>{items.title_post}</h4>
                                    <p className='text-xs ml-3 text-gray-400'>{items.synopsis.length > 140 ? items.synopsis.slice(0, 140) : items.synopsis} </p>
                                    <div className="flex text-xs justify-around text-green-500">
                                        <p>kenh Baomoi</p>
                                        <p>4h ago</p>
                                    </div>
                                </div>
                            ))}
                        {getName_Empty ?
                            <div className="">
                                <Empty />
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
            {/* <p id='background'></p> */}
        </div>
    )
}

export default Web
