# https://pypi.org/project/micropython-ota/
def otaUpdate():
    try:
        import micropython_ota
        print("module 'micropython_ota' is installed")
    except ImportError:
        print("module 'micropython_ota' is not installed")
        print("installing...")
        import mip
        mip.install('github:olivergregorius/micropython_ota/micropython_ota.py')
        import micropython_ota

    ota_host = 'https://tim-meyran.github.io/BoatEngineDashboard/esp32'
    project_name = 'BoatEngingeDashboard'
    filenames = ['main.py','ota.py'] # 'boot.py', 

    print("checking for updates...")
    micropython_ota.ota_update(ota_host, project_name, filenames, use_version_prefix=False, hard_reset_device=True, soft_reset_device=False, timeout=5)