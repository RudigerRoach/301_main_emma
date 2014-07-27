
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public class LoginServlet extends HttpServlet 
{
    /**
     * Overrides the post method to do post communication
         * @param request
         * @param response
         * @throws javax.servlet.ServletException
         * @throws java.io.IOException
     */
    @Override
    //Handle post requests
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
        System.out.println("login");
        //Get post parameters
        String user = request.getParameter("email");
        String id = request.getParameter("deviceUID");
        //test if new login
        if(user != null)
        {
            boolean loginSuccess = false;

            //Getting judges from emma
            String [] judges = MinimalServer.session.getJudges();
            if (judges != null)
            {
                for (String judge : judges) 
                {
                    if (user.equals(judge)) 
                    {
                        loginSuccess = true;
                    }
                }
            }

            //Successful login
            if (loginSuccess == true)
            {
                try
                {
                    File data = new File("youRateSystem.accdb");
                    Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
                    String database = "jdbc:odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=" + data.getAbsolutePath() + ";";
                    Connection conn = DriverManager.getConnection(database,"","");
                    Statement s = conn.createStatement();

                    String table = "SELECT * FROM AutoLogin WHERE email='" + user + "';";
                    s.execute(table);
                    ResultSet rs = s.getResultSet();

                    if((rs != null)&&(rs.next()==false))
                    {
                        Statement s3 = conn.createStatement();
                        s3.execute("SELECT * FROM AutoLogin WHERE deviceUID='" + id +"';");
                        rs = s3.getResultSet();
                        if((rs != null)&&(rs.next()==false))
                        {
                            System.out.println("Don't Remember Device...");
                            String sql = "INSERT INTO AutoLogin (email , deviceUID) VALUES (?,?);";
                            PreparedStatement preparedStatement = conn.prepareStatement(sql);
                            preparedStatement.setString(1, user);
                            preparedStatement.setString(2, id);
                            preparedStatement.executeUpdate();
                            preparedStatement.close();
                        }
                        else
                        {
                            System.out.println("Remember DeviceUID...");
                            Statement s2 = conn.createStatement();
                            s2.executeUpdate("UPDATE AutoLogin SET deviceUID='" + id + "'  WHERE email= '" + user + "';");
                            s2.close();
                        }
                        s3.close();
                    }
                    else
                    {
                        Statement s3 = conn.createStatement();
                        s3.execute("SELECT * FROM AutoLogin WHERE deviceUID='" + id +"' AND email= '" + user + "';");
                        rs = s3.getResultSet();

                        if((rs != null)&&(rs.next()==false))
                        {
                            System.out.println("Remember user...");
                            Statement s2 = conn.createStatement();
                            s2.executeUpdate("UPDATE AutoLogin SET deviceUID='" + id + "'  WHERE email= '" + user + "';");
                            s2.close();
                        }
                        else
                        {
                            System.out.println("Remember Device...");
                        }
                        s3.close();
                    }
                    s.close();
                    conn.close();
                } 
                catch (ClassNotFoundException | SQLException ex)
                {
                    Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
                }
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "success");
                    jsonResponse.put("session_id", request.getSession().getId());
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to successful login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
            //Login fails
            else
            {
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "failed");
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to failed login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
        }
        else //test if it is auto login
        {
            //if no parameters are sent through
            if(id == null)
            {
                id = "";
            }
            String userAuto= "";
            boolean loginSuccess = false;

            try 
            {
                File data = new File("youRateSystem.accdb");
                Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
                String database = "jdbc:odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=" + data.getAbsolutePath() + ";";
                Connection conn = DriverManager.getConnection(database,"","");
                Statement s = conn.createStatement();

                String table = "SELECT * FROM AutoLogin";
                s.execute(table);
                ResultSet rs = s.getResultSet();
                while((rs != null)&&(rs.next()))
                {
                    if (rs.getString(3).equals(id))
                    {
                        userAuto = rs.getString(2);
                    }
                }

                s.close();
                conn.close();
            } 
            catch (SQLException | ClassNotFoundException ex) 
            {
                Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
            }

            //get the judges from emma
            String [] judges = MinimalServer.session.getJudges();
            if (judges != null)
            {
                for (String judge : judges) 
                {
                    if (userAuto.equals(judge)) 
                    {
                        loginSuccess = true;
                    }
                }
            }

            //successFull autoLogin
            if (loginSuccess == true)
            {
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "success");
                    jsonResponse.put("session_id", request.getSession().getId());
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to successful auto login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
            //Login fails
            else
            {
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "failed");
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to failed auto login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
        }
    }
}
