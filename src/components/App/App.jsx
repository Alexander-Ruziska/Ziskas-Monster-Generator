import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MonsterView from "../MonsterView/MonsterView";
import useStore from '../../zustand/store';
import Nav from '../Nav/Nav';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Library from '../Library/Library';
import GenerateMonster from '../GenerateMonster/GenerateMonster';
import DungeonGenerator from '../DungeonGenerator/DungeonGenerator';
import EncounterGenerator from '../EncounterGenerator/EncounterGenerator';
import TreasureGenerator from '../TreasureGenerator/TreasureGenerator';
import NPCGenerator from '../NPCGenerator/NPCGenerator';
import WorldBuilder from '../WorldBuilder/WorldBuilder';
import AdventureGenerator from '../AdventureGenerator/AdventureGenerator';
import Landing from '../Landing/Landing';
import AdminUsers from '../Admin/AdminUsers';
import AdminUserMonsters from '../Admin/AdminUserMonsters';
import AdminAllMonsters from '../Admin/AdminAllMonsters';

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Container>
      <Nav />
      <main>
        <Routes>
          <Route 
            exact path="/"
            element={
              user.id ? (
                <Navigate to="/landing" replace /> // Render HomePage for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/login"
            element={
              user.id ? (
                <Navigate to="/landing" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/landing" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/landing"
            element={
              user.id ? (
                <Landing to="/landing" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/library"
            element={
              user.id ? (
                <Library to="/library" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/generate-monster"
            element={
              user.id ? (
                <GenerateMonster to="/generate-monster" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          {/* Commented out for deployment - work in progress
          <Route 
            exact path="/dungeon-generator"
            element={
              user.id ? (
                <DungeonGenerator to="/dungeon-generator" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          */}
          {/* Commented out unfinished sections - work in progress
          <Route 
            exact path="/encounter-generator"
            element={
              user.id ? (
                <EncounterGenerator to="/encounter-generator" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          */}
          {/* Commented out for deployment - work in progress
          <Route 
            exact path="/treasure-generator"
            element={
              user.id ? (
                <TreasureGenerator to="/treasure-generator" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          */}
          {/* Commented out unfinished sections - work in progress
          <Route 
            exact path="/npc-generator"
            element={
              user.id ? (
                <NPCGenerator to="/npc-generator" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          */}
          {/* Commented out unfinished sections - work in progress
          <Route 
            exact path="/world-builder"
            element={
              user.id ? (
                <WorldBuilder to="/world-builder" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          */}
          {/* Commented out unfinished sections - work in progress */}
          {/*<Route 
            exact path="/adventure-generator"
            element={
              user.id ? (
                <AdventureGenerator to="/adventure-generator" replace />
              ) : (
                <LoginPage />
              )
            }
          />*/}
          <Route 
            exact path="/monster/:id"
            element={
              user.id ? (
                <MonsterView to="/monster-view" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/admin"
            element={
              user.id && user.admin ? (
                <AdminUsers to="/admin" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
           <Route 
            exact path="/admin/monsters/:userId"
            element={
              user.id && user.admin ? (
                <AdminUserMonsters to="/admin/monsters/:userId" replace /> // Redirect authenticated user.
              ) : ( 
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/admin/all-monsters"
            element={
              user.id && user.admin ? (
                <AdminAllMonsters to="/admin/all-monsters" replace /> // Redirect authenticated user.
              ) : ( 
                <LoginPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/about"
            element={
              <>
                <h2 style={{ marginTop: '120px', fontSize: '36px' }}>About Page</h2>
                <p style={{ fontSize: '20px' }}>
                <strong>FableSpire is an interactive tool for Dungeons & Dragons enthusiasts. It offers a blend of user customization and random generation to produce unique monsters, treasures, and dungeons complete with stats, abilities, and AI-generated images. With intuitive forms for entering key parameters and dynamic outputs that provide immersive profiles, this app enhances gameplay and storytelling for any D&D campaign.</strong>
                </p>
              </>
            }
          />
          <Route
            path="*"
            element={
              <h2>404 Page</h2>
            } 
          />
        </Routes>
      </main>
      <footer>
        <p style={{ "fontSize": '10px' }}>Copyright © {new Date().getFullYear()}</p>
      </footer>
      </Container>
  );
}


export default App;
