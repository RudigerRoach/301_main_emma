/**
 *
 * @author Rudiger Roach and Melany Barnes
 *
 */

/*
 HOWTO data-Access-Make-With-Fun

 database = new DBAccess();
 database.open();
 //make fun function calls like database.insert("e@mail.com","A10-452-asd-34");
 database.close();
 */

import com.db4o.Db4oEmbedded;
import com.db4o.ObjectContainer;
import com.db4o.ObjectSet;

public class DBAccess implements Database{

    private ObjectContainer database;
    private final String fileName = "database.db";
    ObjectSet<user> oSet;
    //user nu = new user();

    
    public void open() {
        database = Db4oEmbedded.openFile(Db4oEmbedded.newConfiguration(), fileName);
    }

    public void close() {
        database.close();
    }

    public void insert(String email, String uid) {
        user newU = new user(email, uid);
        database.store(newU);
    }

    public boolean update(String email, String uid) {
        oSet = database.queryByExample(user.class);
        for(user k : oSet){
            if(k.getEmail().compareTo(email)==0){
                k.setUID(uid);
                database.store(k);
                return true;
            }
        }
        return false;
    }

    public boolean delete(String email, String uid) {
        oSet = database.queryByExample(user.class);
        for(user k : oSet){
            if(k.getEmail().compareTo(email)==0 && k.getUID().compareTo(uid)==0){
                database.delete(k);
                return true;
            }
        }
        return false;
    }

    public boolean userExists(String email) {
        oSet = database.queryByExample(user.class);
        for(user k : oSet){
            if(k.getEmail().compareTo(email)==0){
                return true;
            }
        }
        return false;
    }

    public boolean deviceExists(String uid) {
        oSet = database.queryByExample(user.class);
        for(user k : oSet){
            if(k.getUID().compareTo(uid)==0){
                return true;
            }
        }
        return false;
    }

    public boolean shouldAutoLogin(String email, String uid) {
        oSet = database.queryByExample(user.class);
        for(user k : oSet){
            if(k.getUID().compareTo(uid)==0 && k.getEmail().compareTo(email)==0){
                return true;
            }
        }
        return false;
    }

    public void selectAll() {
        oSet = database.queryByExample(user.class);
        System.out.println(oSet.toString());
    }
    
    public String getMail(String uid) {
        oSet = database.queryByExample(user.class);
        for(user k : oSet){
            if(k.getUID().compareTo(uid)==0){
                return k.getEmail();
            }
        }
        return "";
    }
    
    private class user {
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
}
