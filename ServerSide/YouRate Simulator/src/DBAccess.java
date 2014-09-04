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

public class DBAccess {

    private ObjectContainer database;
    private final String fileName = "database.db";
    ObjectSet<user> oSet;
    user nu = new user();

    public void open() {
        database = Db4oEmbedded.openFile(Db4oEmbedded.newConfiguration(), fileName);
    }

    public void close() {
        database.close();
    }

    public void insert(String email, String uid) {
        user usr = new user();
        usr.email = email;
        usr.uid = uid;
        database.store(usr);
    }

    public boolean update(String email, String uid) {
        ObjectSet<user> set = database.queryByExample(user.class);
        for(user j : set){
            if(j.email.compareTo(email)==0){
                j.uid = uid;
                database.store(j);
                return true;
            }
        }
        return false;
    }

    public boolean delete(String email, String uid) {
        ObjectSet<user> set = database.queryByExample(user.class);
        for(user j : set){
            if(j.email.compareTo(email)== 0 && j.uid.compareTo(uid) == 0){
                database.delete(j);
                return true;
            }
        }
        return false;
    }

    public boolean userExists(String email) {
        ObjectSet<user> set = database.queryByExample(user.class);
        for(user j : set){
            if(j.email != null && j.email.compareTo(email)== 0){
                return true;
            }
        }
        return false;
    }

    public boolean deviceExists(String uid) {
        ObjectSet<user> set = database.queryByExample(user.class);
        for(user j : set){
            if(j.uid != null && j.uid.compareTo(uid)== 0){
                return true;
            }
        }
        return false;
    }

    public boolean shouldAutoLogin(String email, String uid) {
        ObjectSet<user> set = database.queryByExample(user.class);
        for(user j : set){
            if(j.uid != null && j.uid.compareTo(uid)== 0 && j.email.compareTo(email)== 0){
                return true;
            }
        }
        return false;
    }

    public void selectAll() {
        oSet = database.queryByExample(user.class);
        for(Object j : oSet){
            if(((user)j).email != null)
            System.out.println(((user)j).email+" "+((user)j).uid);
        }
    }
    
    public String getMail(String uid) {
        ObjectSet<user> set = database.queryByExample(user.class);
        for(user j : set){
            if(j.uid.compareTo(uid) == 0){
                return j.email;
            }
        }
        return "";
    }
    
    private class user {
        public String uid;
        public String email;

        public void clear() {
            uid = "";
            email = "";
        }
    }
}
