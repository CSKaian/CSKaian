import React from 'react';
import { safeStorage } from '../lib/safeStorage';

interface State {
  hasError: boolean;
  errorMessage: string;
}

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  declare setState: (state: Partial<State>) => void;

  state: State = {
    hasError: false,
    errorMessage: ''
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'Terjadi kesalahan pada tampilan aplikasi.'
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[App ErrorBoundary] Caught runtime error:', error, info);
  }

  handleReload = () => {
    try {
      window.location.reload();
    } catch {
      this.setState({ hasError: false, errorMessage: '' });
    }
  };

  handleResetViewAndReload = () => {
    try {
      safeStorage.removeItem('BARN_ACTIVE_MODULE');
      safeStorage.removeItem('BARN_ACTIVE_RM_TAB');
      safeStorage.removeItem('BARN_FILTERS');
      safeStorage.removeItem('BARN_ADMIN_MODE');
    } catch {}
    this.handleReload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-950/90 border border-rose-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <i className="fas fa-exclamation-triangle text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-black uppercase tracking-wider text-white">
                Terjadi Gangguan Tampilan Web
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aplikasi mengalami error sementara saat memuat halaman. Data Anda tetap aman tersimpan di server & cache lokal.
              </p>
              {this.state.errorMessage && (
                <p className="text-[11px] font-mono text-rose-300/90 bg-rose-950/40 border border-rose-500/20 rounded-xl p-2.5 break-words">
                  {this.state.errorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Muat Ulang
              </button>
              <button
                type="button"
                onClick={this.handleResetViewAndReload}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <i className="fas fa-broom mr-2"></i>
                Reset Cache Tampilan
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
