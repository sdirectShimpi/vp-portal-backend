const mongoose = require("mongoose");
const roles = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userType: {
       type: Number,
       default: 5,
       enum: [1,2,3,4,5] //1
    },
    manageDashboard: {
      type: Boolean,
      default: false,
    },
    manageAdmin: [
     
      {
        _id: false, 
       
        add: {
          type: Boolean,
          default: false,
        },

        edit:{
            type: Boolean,
            default: false,  
        },
        view:{
            type: Boolean,
            default: false,
        },
        delete:{
            type: Boolean,
            default: false,
        },
      },
    ],

    manageScrumMaster: [
        {
          _id: false, 
          add: {
            type: Boolean,
            default: false,
          },
  
          edit:{
              type: Boolean,
              default: false,  
          },
          view:{
              type: Boolean,
              default: false,
          },
          delete:{
              type: Boolean,
              default: false,
          },
        },
      ],
manageOperator: [
        {
          _id: false, 
          add: {
            type: Boolean,
            default: false,
          },
  
          edit:{
              type: Boolean,
              default: false,  
          },
          view:{
              type: Boolean,
              default: false,
          },
          delete:{
              type: Boolean,
              default: false,
          },
        },
      ],


      po: [
        {
         
          _id : false,
          add: {
            type: Boolean,
            default: false,
          },
  
          edit:{
              type: Boolean,
              default: false,  
          },
          view:{
              type: Boolean,
              default: false,
          },
          delete:{
              type: Boolean,
              default: false,
          },
        },
      ],
      manageEmpolyee: [
        {
          _id: false, 
          add: {
            type: Boolean,
            default: false,
          },
  
          edit:{
              type: Boolean,
              default: false,  
          },
          view:{
              type: Boolean,
              default: false,
          },
          delete:{
              type: Boolean,
              default: false,
          },
        },
      ],
      managePortal: 
        {
          
            type: Boolean,
            default: false,
          },
  
         
          manageReview: [
        {
          _id: false, 
          add: {
            type: Boolean,
            default: false,
          },
  
          edit:{
              type: Boolean,
              default: false,  
          },
          view:{
              type: Boolean,
              default: false,
          },
          delete:{
              type: Boolean,
              default: false,
          },
        },
      ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = roles;
