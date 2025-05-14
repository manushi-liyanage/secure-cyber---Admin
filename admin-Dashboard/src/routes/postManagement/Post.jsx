import { MessageCircleMore } from 'lucide-react';
const PostManagement = () => {

    return(
        <div className=" flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <div className='size-12 shrink-0'>
                <MessageCircleMore size={50}/> 
            </div>
            <div>
                <div className="text-xl font-medium text-black dark:text-white">Notification Section .</div>
                <p className="text-gray-500 dark:text-gray-400">You have received new Notification !</p>
            </div>
        </div>
    )
}

export default PostManagement;
