import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users , StickyNote , LogOut} from "lucide-react";
import profileImage from "../assets/5856.jpg"
import ProductImage from "../assets/product-image.jpg"

export const navbarLinks = [
    {
        title : "Dashboard",
        links : [
            {
                label :"Dashboard",
                icon : Home,
                path : "/",
            },
            {
                label : "Analytics",
                icon : ChartColumn,
                path : "/analytics",
            },
            {
                label : "Reports",
                icon : NotepadText,
                path : "/reports",
            },
        ],
    },
    {
        title : "Post Management",
        links : [
            {
                label : "Post Management",
                icon : StickyNote,
                path : "/PostManagement"
            },
            // {
            //     label: "New customer",
            //     icon: UserPlus,
            //     path: "/new-customer",
            // },
            // {
            //     label : "Verified customers",
            //     icon : UserCheck,
            //     path : "/verified-customers",
            // },
        
        ],
    },
    { 
        title : "User Management",
        links : [
            {
                label : "User Management",
                icon : Users,
                path : "/UserMangement"
            },
            {
                label : "Add User",
                icon : UserPlus,
                path : "/addUser",

            },
            // {
            //     label : "Inventory",
            //     icon : ShoppingBag,
            //     path : "/inventory",
            // },
        
        ],
    },
    {
        title : "Settings",
        links : [
            {
                label : "Settings",
                icon : Settings,
                path : "/settings",
            },
        ],
    },
    {
        title : "Logout",
        links : [
            {
                label : "Logout",
                icon : LogOut,
                path : "/logout",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 15,
    },
    {
        name: "Feb",
        total: 20,
    },
    {
        name: "Mar",
        total: 10,
    },
    {
        name: "Apr",
        total: 5,
    },
    {
        name: "May",
        total: 20,
    },
    {
        name: "Jun",
        total: 59,
    },
    {
        name: "Jul",
        total: 20,
    },
    {
        name: "Aug",
        total: 5,
    },
    {
        name: "Sep",
        total: 2,
    },
    {
        name: "Oct",
        total: 4,
    },
    {
        name: "Nov",
        total: 1,
    },
    {
        name: "Dec",
        total: 25,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: profileImage,
        time: 15.10 ,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: profileImage,
        time: 20.00,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: profileImage,
        time: 4.00,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: profileImage,
        time: 13.00,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: profileImage,
        time: 2.00,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: profileImage,
        time: 4.50,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: profileImage,
        time: 5.30,
    },
];

export const topProducts = [
    {
        number: 1,
        name: "Wireless Headphones",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        price: 99.99,
        status: "In Stock",
        rating: 4.5,
    },
    {
        number: 2,
        name: "Smartphone",
        image: ProductImage,
        description: "Latest 5G smartphone with excellent camera features.",
        price: 799.99,
        status: "In Stock",
        rating: 4.7,
    },
    {
        number: 3,
        name: "Gaming Laptop",
        image: ProductImage,
        description: "Powerful gaming laptop with high-end graphics.",
        price: 1299.99,
        status: "In Stock",
        rating: 4.8,
    },
    {
        number: 4,
        name: "Smartwatch",
        image: ProductImage,
        description: "Stylish smartwatch with fitness tracking features.",
        price: 199.99,
        status: "Out of Stock",
        rating: 4.4,
    },
    {
        number: 5,
        name: "Bluetooth Speaker",
        image: ProductImage,
        description: "Portable Bluetooth speaker with deep bass sound.",
        price: 59.99,
        status: "In Stock",
        rating: 4.3,
    },
    {
        number: 6,
        name: "4K Monitor",
        image: ProductImage,
        description: "Ultra HD 4K monitor with stunning color accuracy.",
        price: 399.99,
        status: "In Stock",
        rating: 4.6,
    },
    {
        number: 7,
        name: "Mechanical Keyboard",
        image: ProductImage,
        description: "Mechanical keyboard with customizable RGB lighting.",
        price: 89.99,
        status: "In Stock",
        rating: 4.7,
    },
    {
        number: 8,
        name: "Wireless Mouse",
        image: ProductImage,
        description: "Ergonomic wireless mouse with precision tracking.",
        price: 49.99,
        status: "In Stock",
        rating: 4.5,
    },
    {
        number: 9,
        name: "Action Camera",
        image: ProductImage,
        description: "Waterproof action camera with 4K video recording.",
        price: 249.99,
        status: "In Stock",
        rating: 4.8,
    },
    {
        number: 10,
        name: "External Hard Drive",
        image: ProductImage,
        description: "Portable 2TB external hard drive for data storage.",
        price: 79.99,
        status: "Out of Stock",
        rating: 4.5,
    },
];