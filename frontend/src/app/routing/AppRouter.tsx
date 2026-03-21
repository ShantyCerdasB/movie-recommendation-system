/**
 * @fileoverview Defines the application route tree, mapping URLs to feature pages.
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import MoviesPage from '../../movies/pages/MoviesPage'
import RecommendationsPage from '../../recommendations/pages/RecommendationsPage'
import MatrixViewPage from '../../matrix-view/pages/MatrixViewPage'
import MathExplanationPage from '../../math-explanation/pages/MathExplanationPage'
import UsersPage from '../../users/pages/UsersPage'

/**
 * Renders the full client-side route tree.
 * All feature pages are nested under {@link MainLayout} so they share
 * the persistent navbar and sidebar chrome.
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/movies" replace />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/matrix" element={<MatrixViewPage />} />
        <Route path="/math" element={<MathExplanationPage />} />
      </Route>
    </Routes>
  )
}
