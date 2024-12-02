import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/comp/Navbar";
import Card from "../../components/comp/card"

const FamousCart=()=>{
    return (
        <div className="bestsellings">
             <Card/>
        </div>
    )
}

export default FamousCart;