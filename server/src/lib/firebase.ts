import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const FIREBASE_PROJECT_ID = "islagrid";
const FIREBASE_CLIENT_EMAIL =
  "firebase-adminsdk-fbsvc@islagrid.iam.gserviceaccount.com";
const FIREBASE_PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4pur3MhNBmh6G\njY+tuqu52huabySsUw+jNe88PZf2ahq3HmQ2d/4pA9WihjZK0XJ/tL97jqEDkB9o\nHI2OGxizsVYHJPRzMQV/zHVdS4kI1yU9zE7ntpBwJqmkUGj74lf5ytqxx54sufj0\nCMfM5cyOzKd0l4hxB1qFYgqTrJ14z3otcjY5fSyDZzu5ltF3DnA8zgS7i/p3tWbg\nbc7r6TPztl3MtNMcmdkjMzWEldMtrIf2eug/I0FLEeq7SWZj/VmiujIkGV/vef8i\nTr2FSdACkgjEr8XHtY0Zp4lyAm1gGetFBj41Anpp5T7mhKTMTEy/oelZF8yeoJE+\nMndX1/lVAgMBAAECggEAHhtr25WjmXev8Hprvy+HnncB4dgAtRmZ8XTy0UdYXAoy\n2Zav+khC/ZxYHKF2Kr7PGiQgxdxHQ+sfjnx8AXvzjCD8XjqComGPfFCcS55BoAUM\nV8Yp5hKt/EtML7QYr1vZbQDL+wle21C7VyGItPo8XzAz7DO6QHZVe8K053J7/ogg\nv8wWvRLX9MsPAi3zpZ5Mpqj5am/98IyhAVSL3DRi78F2DSCge3opBtNG508hDYvj\nkOrbziJ6AOuUuKvNqyeGUdOpGEFW6hfJMbyRb5AInwpo5ygRzXSDHgrL0sgBXQ20\npguVP93gW16yqlApSdgPuWbucLIIhcy0QDQR6KnNZQKBgQD75unzY82J+tpaMTQc\nGWKdXwJQaYgBodZV+IBy5qOfn4+VsExg+3f2hha/fs9/Bq4O3hO0/e4yjrSvqDb7\nnrkGvbfW011oNiAh5KqAS92h/yDvxoLHA7BLh9J8HmzXZYu9/8/s2hqK3G7mKlUP\n58ty47Zm9iik1HOFATmFa+2LgwKBgQC7p+5AI722jfC7XO+ZALO7LG7BkSAUtXOS\ne/A0sEoMTbitrg9uA6ZC5geuOGtzLUWyCd3oTOZQg1sPKaSk+trUDlofS9o+5BDu\nZc7Gdvc3NhY6lVz1bwlOoxdw5zzH0xR9HjxthrBhn5zWU757CuHvup6aIxm9BBVY\nReB7XPYYRwKBgQDN/U5i0cJKiu/zwTizoa6asg7aYvHtI8J6GvQvAZvb9EceSUSs\nKfc3iP8hKTnUzkmXrtK+tsgKX9gxrIUJzgnQEWQ8MCu6BEjSboNe1qsuxcrRSKu4\nwrNvkGn3RYoLueZEQORu8wuxcgDeBs/4abxc/wkxuSoTYAf3Q8Ed8dwWsQKBgBk2\nPa9GXgW52j8CBHrU+lDKbnL5MYs2ublTh3k8uiYfBxHmkdIhEWRpjVyd3enSikua\nQcMlGch1bXWDDcjQnzfgWcFcqozKjW/KI9bMQvia/q+OQ7gB3AlBpjOYDbV3KYiJ\n2GqKrwXesO6mv6++TY6szwQ8dQfNFaUPdlJ8sd+fAoGBANiVt4PGCs4ewEBsgnLd\nceJzWBeVhCwfuANVnSeplVFonWViAjLokBZfhNkOR2u+Nm7KQYKTNMtZQ75h0dnG\nuowNBWDUPTJjt3rzovgH8aw7MPE5AynMUjoKmyEraX11FjyneRnTJinwdLhZf6rE\ntXtnvdedv7ff0my5vgwAsYoL\n-----END PRIVATE KEY-----\n";

const serviceAccount = {
  project_id: FIREBASE_PROJECT_ID,
  client_email: FIREBASE_CLIENT_EMAIL,
  private_key: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      });

export const auth = getAuth(app);
export const db = getFirestore(app);
