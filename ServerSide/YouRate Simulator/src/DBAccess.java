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
        nu.email = email;
        nu.uid = uid;
        database.store(nu);
    }

    public boolean update(String email, String uid) {
        nu.clear();
        nu.email = email;

        oSet = database.queryByExample(nu);
        if (oSet.size() > 0) {
            nu = oSet.next();
            nu.uid = uid;
            database.store(nu);
            return true;
        }
        return false;
    }

    public boolean delete(String email, String uid) {
        nu.email = email;
        nu.uid = uid;
        oSet = database.queryByExample(nu);
        if (oSet.size() > 0) {
            nu = oSet.next();
            database.delete(nu);
            return true;
        }
        return false;
    }

    public boolean userExists(String email) {
        nu.clear();
        nu.email = email;
        oSet = database.queryByExample(nu);
        return oSet.size() > 0;
    }

    public boolean deviceExists(String uid) {
        nu.clear();
        nu.uid = uid;
        oSet = database.queryByExample(nu);
        return oSet.size() > 0;
    }

    public boolean shouldAutoLogin(String email, String uid) {
        nu.uid = uid;
        nu.email = email;
        oSet = database.queryByExample(nu);
        return oSet.size() > 0;
    }

    public void selectAll() {
        oSet = database.queryByExample(user.class);
        System.out.println(oSet.toString());
    }
    
    public String getMail(String uid) {
        nu.clear();
        nu.uid = uid;
        oSet = database.queryByExample(nu);
        if(oSet.size() > 0){
            nu = oSet.next();
            return nu.email;
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
