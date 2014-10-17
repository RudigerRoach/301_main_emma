/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
 public class user 
 {
        private String uid;
        private String email;
        
        @Override
        public String toString(){
            return email + " "+ uid;
        }
        
        public user()
        {
            
        }

        public user(String uid, String email)
        {
            this.uid = uid;
            this.email = email;
        }
        
        public void setUID(String uid){
            this.uid = uid;
        }
        
        public void setEmail(String email){
            this.email = email;
        }
        
        public String getEmail(){
            return this.email;
        }
        
        public String getUID(){
            return this.uid;
        }
    }
